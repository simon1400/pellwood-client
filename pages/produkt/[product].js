import {useState, useContext} from 'react';
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import {dropdown, offcanvas} from 'uikit'
import Page from '../../layout/Page';
import RandomArticles from '../../components/RandomArticles';
import ShortBlock from '../../components/SmallShortCart';
import sanityClient from "../../lib/sanity.js";
import translate from '../../data/staticTranslate'
import { DataStateContext } from '../../context/dataStateContext'
import localize from '../../data/localize'
import { useRouter } from 'next/router'
const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = source => imageBuilder.image(source)

export async function getServerSideProps({params, locale}) {

  const {lang, currency} = localize(locale)
  const query = `{
    'products': *[_type == "product" && ${lang}.slug.current == $url] {
      _id,
      ${lang},
      "linkedCarts": *[ _type == "product" && _id in [^.${lang}.linkedProducts.product_1._ref, ^.${lang}.linkedProducts.product_2._ref, ^.${lang}.linkedProducts.product_3._ref]].${lang} | order(sort asc)
    },
    'articles': *[_type == "article"] | order(sort asc)
  }`;
  const data = await sanityClient.fetch(query, {url: params.product})

  var product = data.products[0][lang]
  if(lang === 'en'){
    if(typeof product.price === 'string'){
      product.price.replace(/,/g, '.')
    }else if(product.variants?.length){
      product.variants = product.variants.map(variant => {
        variant.price = variant.price.replace(/,/g, '.')
        return variant
      })
    }
  }

  const filteredLinedcards = data.products[0].linkedCarts.filter(item => item?.title)
  if(lang === 'en'){
    filteredLinedcards.map(item => {
      if(typeof item.price === 'string'){
        item.price.replace(/,/g, '.')
      }else if(item.variants?.length){
        item.variants = item.variants.map(variant => {
          variant.price = variant.price.replace(/,/g, '.')
          return variant
        })
      }
    })
  }

  const shuffle = (a, count) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a
  }

  const articlesFilteredFirst = data.articles.filter(item => item[lang]?.category._ref.includes("3252355e-13f2-4628-8db4-a90bb522713b"))
  const articlesFilteredSeccond = data.articles.filter(item => item[lang]?.category._ref.includes("53b17b89-299c-48b1-b332-26240fc0e624"))

  return {
    props: {
      carts: filteredLinedcards,
      articleFirst: shuffle(articlesFilteredFirst, 0),
      articleSeccond: shuffle(articlesFilteredSeccond, 1),
      product,
      productId: data.products[0]._id,
      lang,
      currency
    }
  }
}

const Product = ({
  carts,
  articleFirst,
  articleSeccond,
  product,
  productId,
  lang,
  currency
}) => {

  const router = useRouter()
  const [count, setCount] = useState(1)
  const [loader, setLoader] = useState(false)
  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)

  const [select, setSelect] = useState({
    name: translate.selectvariant[lang],
    price: ''
  })

  const [error, setError] = useState({
    select: false,
    count: false
  })

  const selectHandle = (name, price) => {
    setSelect({ ...select, name, price })
    setError({ ...error, select: false })
    dropdown(".select-variant").hide();
  }

  const onBuy = async () => {
    setLoader(true)
    if(select.name === translate.selectvariant[lang] && product?.variants?.length){
      setError({ ...error, select: true })
      setLoader(false)
      router.push(router.asPath)
      return;
    }
    if(count === 0){
      setError({ ...error, count: true })
      setLoader(false)
      router.push(router.asPath)
      return;
    }

    router.push(router.asPath + '?buy=true')

    var newBasketItem = {
      id: productId,
      nameProduct: product.title,
      variantName: select.name,
      variantPrice: select.price,
      countVariant: count,
      imgUrl: urlFor(product.image).url()
    }

    if(!product?.variants?.length){
      newBasketItem.variantName = product.title
      if(typeof product.price === 'string'){
        newBasketItem.variantPrice = product.price
      }else{
        newBasketItem.variantPrice = product.price
      }

    }else{
      newBasketItem.variantName = select.name
      newBasketItem.variantPrice = select.price
    }

    let basket = dataContextState.basket
    let basketCount = dataContextState.basketCount

    if(basket === undefined || basket === null || !basket){
      basket = []
      basket.push(newBasketItem)
      basketCount = 1
    }else{
      let indexBasket = -1;
      basket.map((item, index) => {
        if(product?.variants?.length){
          if(item.id === productId && basket[index].variantName === select.name){
            indexBasket = index
          }
        }else if(item.id === productId){
          indexBasket = index
        }
      })
      if(indexBasket >= 0){
        basket[indexBasket].countVariant = +basket[indexBasket].countVariant + count
      }else{
        basketCount = +basketCount + 1
        basket.push(newBasketItem)
      }
      indexBasket = -1
    }
    dataContextDispatch({ state: basket, type: 'basket' })
    dataContextDispatch({ state: basketCount, type: 'basketCount' })
    await offcanvas('#offcanvas-flip').show();
    setLoader(false)
  }

  return (
    <Page id="product" description={product.descriptionHead} title={product.titleHead} image={product.orientedImage ? urlFor(product.image).orientation(270).url() : urlFor(product.image).url()}>
      <section className="full product">
        <div className="uk-grid uk-child-width-1-1 uk-child-width-1-2@m" uk-grid="" uk-height-match="target: > div > div">
          <div>
            <div className={`article_img_wrap ${product.orientedImage && 'scale_img'}`}>
              <div className="uk-visible@m">
                {product.orientedImage
                  ? <img src={urlFor(product.image).orientation(270).url()} alt={product.title} />
                  : <img src={urlFor(product.image).url()} alt={product.title} />}
              </div>
              <div className={`uk-hidden@m ${product.orientedImage && 'orianted-img'}`}>
                {product.orientedImage ? <img src={urlFor(product.image).orientation(180).url()} alt={product.title} />
                : <img src={urlFor(product.image).url()} alt={product.title} />}
              </div>
            </div>
          </div>
          <div>
            <div className="content_wrap grey">
              <div className="content">
                <h1 className="head_1">{product.title}</h1>
                {!!product?.variants?.length && <div className="variants_list">
                  {product.variants.map((item, index) => {
                    if(item.price){
                      return <div key={index} className="uk-grid uk-grid-medium" uk-grid="">
                        <div className="uk-width-expand">{item.title}</div>
                        <div className="short_price">
                          {lang === 'en' ? (Math.round(+item.price * 100) / 100).toFixed(2) : item.price} {currency}
                        </div>
                      </div>
                    }
                    return ''
                  })}
                </div>}

                {!!product?.variants?.[0].price && <div className="order_block">
                  <div className="uk-flex uk-flex-between">
                    <div className="uk-width-1-1 uk-width-auto@m">
                      <div className="custom-select-wrap">
                        <button className={`custom-select uk-button uk-button-default ${error.select && 'error'}`} type="button" tabIndex="-1">
                          <span>{select.name}</span>
                          <span><img src="/assets/chevron-down-light.svg" alt="Down" /></span>
                        </button>
                        <div className="uk-dropdown select-variant" uk-dropdown="mode: click; pos: bottom-justify; offset: 0">
                          <ul className="uk-nav uk-dropdown-nav">
                            {(product?.variants || []).map((item, index) => <Variant key={index} lang={lang} currency={currency} handle={selectHandle} name={item.title} price={item.price} />)}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className={`custom_number quantity ${error.count && 'error'}`}>
                      <input type="number" min="1" max="1000" step="1" onChange={(e) => setCount(+e.target.value)} value={count} />
                      <div className="quantity-nav">
                        <div className="quantity-button quantity-up" onClick={() => setCount(count + 1)}>+</div>
                        <div className="quantity-button quantity-down" onClick={() => {if(count > 0){ return setCount(count - 1)} else{ return false}}}>-</div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="uk-width-1-1 uk-margin-top tm-button tm-black-button"
                    onClick={() => onBuy()}>
                    {loader && <div uk-spinner="" className="uk-icon uk-spinner"></div>}{translate.addToBasket[lang]}
                  </button>
                </div>}
                {!product?.variants?.length && <div className="tm-single-order">
                  <div className="tm-single-price uk-text-center uk-margin-bottom">{currency === '$' && currency} {product.price} {currency !== '$' && currency}</div>
                  <div className="uk-grid-small uk-grid" uk-grid="">
                    <div className="uk-width-1-3">
                      <div className={`custom_number quantity ${error.count && 'error'}`}>
                        <input type="number" min="1" max="1000" step="1" onChange={(e) => setCount(+e.target.value)} value={count} />
                        <div className="quantity-nav">
                          <div className="quantity-button quantity-up" onClick={() => setCount(count + 1)}>+</div>
                          <div className="quantity-button quantity-down" onClick={() => {if(count > 0){ return setCount(count - 1)} else{ return false}}}>-</div>
                        </div>
                      </div>
                    </div>
                    <div className="uk-width-2-3">
                      <button
                        className="uk-width-1-1 tm-button tm-black-button"
                        onClick={() => onBuy()}>
                        {loader && <div uk-spinner="" className="uk-icon uk-spinner"></div>}{translate.addToBasket[lang]}
                      </button>
                    </div>
                  </div>
                </div>}
                <div className="description_product">
                  <BlockContent blocks={product.text} />
                </div>
                <div className="paramets">
                  <table className="uk-table uk-table-divider uk-table-small">
                    <tbody>
                      {(product.parametrs || []).map((item, index) => <tr key={index}>
                        <td>{item.title}</td>
                        <td className="uk-text-right">{item.value}</td>
                      </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ShortBlock data={carts} lang={lang} currency={currency}/>
      <RandomArticles lang={lang} articleFirst={articleFirst} articleSeccond={articleSeccond} />
    </Page>
  )

}

const Variant = ({handle, name, price, lang, currency}) => {
  return(
    <li className="variant_select uk-flex" onClick={e => handle(name, price)}>
      <span className="uk-width-expand" >{name}</span>
      <span className="uk-width-auto uk-text-right">{lang === 'en' ? (Math.round(price * 100) / 100).toFixed(2) : price} {currency}</span>
    </li>
  )
}

export default Product
