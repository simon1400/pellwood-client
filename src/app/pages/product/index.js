import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import Page from '../../components/page';
import RandomArticles from '../../components/random-articles';
import ShortBlock from '../../components/small-short-cart';
import sanityClient from "../../../lib/sanity.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import {dropdown, util, offcanvas} from 'uikit'
import translate from '../../data/staticTranslate'
import { DataStateContext } from '../../context/dataStateContext'

import down from '../../assets/chevron-down-light.svg'

import './style.scss'
import localize from '../../data/localize'
const {lang, currency} = localize(window.location.href)

const imageBuilder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return imageBuilder.image(source);
}


const query = `{
  'products': *[_type == "product" && ${lang}.slug.current == $url] {
    _id,
    ${lang},
    "linkedCarts": *[ _type == "product" && _id in [^.${lang}.linkedProducts.product_1._ref, ^.${lang}.linkedProducts.product_2._ref, ^.${lang}.linkedProducts.product_3._ref]].${lang} | order(sort asc)
  },
  'articles': *[_type == "article"] | order(sort asc)
}`;

const Variant = ({handle, name, price}) => {
  return(
    <li className="variant_select uk-flex" onClick={e => handle(name, price)}>
      <span className="uk-width-expand" >{name}</span>
      <span className="uk-width-auto uk-text-right">{lang === 'en' ? (Math.round(price.replace(/,/g, '.') * 100) / 100).toFixed(2).replace(/\./g, ',') : price} {currency}</span>
    </li>
  )
}

const Product = ({match, history}) => {

  const [product, setProduct] = useState([])
  const [productId, setProductId] = useState([])
  const [carts, setCarts] = useState([])
  const [articleFirst, setArticleFirst] = useState([])
  const [articleSeccond, setArticleSeccond] = useState([])
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

  useEffect(() => {
    sanityClient.fetch(query, {url: match.params.url}).then(data => {
      if(!data.products.length){
        window.location.href = '/not-found'
      }
      setProduct(data.products[0][lang])
      setProductId(data.products[0]._id)
      const filteredLinedcards = data.products[0].linkedCarts.filter(item => item?.title)
      setCarts(filteredLinedcards)
      const articlesFilteredFirst = data.articles.filter(item => item[lang]?.category._ref.includes("3252355e-13f2-4628-8db4-a90bb522713b"))
      shuffle(articlesFilteredFirst, 0)
      const articlesFilteredSeccond = data.articles.filter(item => item[lang]?.category._ref.includes("53b17b89-299c-48b1-b332-26240fc0e624"))
      shuffle(articlesFilteredSeccond, 1)
    })
  }, [])

  const selectHandle = (name, price) => {
    setSelect({ ...select, name, price })
    setError({ ...error, select: false })
    dropdown(".select-variant").hide();
  }

  const shuffle = (a, count) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }

    if(!count) setArticleFirst(a);
    else setArticleSeccond(a);

  }

  const onBuy = () => {
    setLoader(true)
    if(select.name === translate.selectvariant[lang] && product?.variants?.length){
      setError({ ...error, select: true })
      setLoader(false)
      history.push({search: ''})
      return;
    }
    if(count === 0){
      setError({ ...error, count: true })
      setLoader(false)
      history.push({search: ''})
      return;
    }

    history.push({search: '?buy=true'})

    var newBasketItem = {
      id: productId,
      nameProduct: product.title,
      variantName: select.name,
      variantPrice: select.price.replace(/,/g, '.'),
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
    offcanvas('#offcanvas-flip').show();
    setLoader(false)
  }

  if(!Array.isArray(product)){
    return (
      <Page id="product" description={product.descriptionHead} title={product.titleHead}>
        <section className="full product">
          <div className="uk-grid uk-child-width-1-1 uk-child-width-1-2@m" uk-grid="" uk-height-match="target: > div > div">
            <div>
              <div className={`article_img_wrap ${product.orientedImage && 'scale_img'}`}>
                <div className="uk-visible@m">
                  {product.orientedImage ? <img src={urlFor(product.image).width(Math.round(window.innerHeight + (window.innerHeight * 20 / 100))).orientation(270).url()} alt={product.title} />
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
                            {lang === 'en' ? (Math.round(+item.price.replace(/,/g, '.') * 100) / 100).toFixed(2).replace(/\./g, ',') : item.price} {currency}
                          </div>
                        </div>
                      }
                      return ''
                    })}
                  </div>}

                  {!!product?.variants[0].price && <div className="order_block">
                    <div className="uk-flex uk-flex-between">
                      <div className="uk-width-1-1 uk-width-auto@m">
                        <div className="custom-select-wrap">
                          <button className={`custom-select uk-button uk-button-default ${error.select && 'error'}`} type="button" tabIndex="-1">
                            <span>{select.name}</span>
                            <span><img src={down} alt="Down" /></span>
                          </button>
                          <div className="uk-dropdown select-variant" uk-dropdown="mode: click; pos: bottom-justify; offset: 0">
                            <ul className="uk-nav uk-dropdown-nav">
                              {(product?.variants || []).map((item, index) => <Variant key={index} handle={selectHandle} name={item.title} price={item.price} />)}
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
  }else{
    return <div></div>
  }

}


export default Product
