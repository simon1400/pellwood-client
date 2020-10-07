import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Page from '../../components/page';
import RandomArticles from '../../components/random-articles';
import ShortBlock from '../../components/small-short-cart';
import sanityClient from "../../../lib/sanity.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import UIkit from 'uikit'


import down from '../../assets/chevron-down-light.svg'

import './style.scss'

const imageBuilder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return imageBuilder.image(source);
}

var lang = 'cz', currency = 'Kč'
if(window.location.pathname.split('/')[1] === 'en'){
  lang = 'en';
  currency = '$';
}else if(window.location.pathname.split('/')[1] === 'de'){
  lang = 'de';
  currency = '&euro;';
}else{
  lang = 'cz';
  currency = 'Kč';
}

const query = `{
  'products': *[_type == "product" && ${lang}.slug.current == $url] {
    _id,
    ${lang},
    "linkedCarts": *[ _type == "product" && _id in [^.${lang}.linkedProducts.product_1._ref, ^.${lang}.linkedProducts.product_2._ref, ^.${lang}.linkedProducts.product_3._ref]].${lang} | order(sort asc)
  },
  'articles': *[_type == "article"] | order(sort asc)
}`;

export default ({match}) => {

  const [product, setProduct] = useState([])
  const [productId, setProductId] = useState([])
  const [carts, setCarts] = useState([])
  const [articleFirst, setArticleFirst] = useState([])
  const [articleSeccond, setArticleSeccond] = useState([])
  const [count, setCount] = useState(1)
  const [loader, setLoader] = useState(false)

  const [select, setSelect] = useState({
    name: 'Vybrat variantu',
    price: ''
  })

  const [error, setError] = useState({
    select: false,
    count: false
  })

  useEffect(() => {
    sanityClient.fetch(query, {url: match.params.url}).then(data => {
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

  const selectHandle = (e) => {
    e.preventDefault()
    UIkit.drop(UIkit.util.find(".select_dropdown")).hide();
    setSelect({
      ...select,
      name: e.currentTarget.dataset.name,
      price: e.currentTarget.dataset.price
    })
    setError({ ...error, select: false })
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
    if(select.name === 'Vybrat variantu' && product?.variants?.length){
      setError({ ...error, select: true })
      setLoader(false)
      return;
    }
    if(count === 0){
      setError({ ...error, count: true })
      setLoader(false)
      return;
    }


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
      newBasketItem.variantPrice = product.price
    }else{
      newBasketItem.variantName = select.name
      newBasketItem.variantPrice = select.price
    }

    let basket = JSON.parse(localStorage.getItem('basket'))
    let basketCount = JSON.parse(localStorage.getItem('basketCount'))

    if(basket === undefined || basket === null || !basket){
      basket = []
      basket.push(newBasketItem)
      basketCount = 1
    }else{
      let indexBasket = -1;
      basket.map((item, index) => {
        if(product.variants.length){
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

    localStorage.setItem('basket', JSON.stringify(basket))
    localStorage.setItem('basketCount', JSON.stringify(basketCount))
    UIkit.offcanvas(UIkit.util.find('#offcanvas-flip')).show();
    setLoader(false)
  }

  if(!Array.isArray(product)){
    return (
      <Page id="product" description={product.descriptionHead} title={product.titleHead}>
        <section className="full product">
          <div className="uk-grid uk-child-width-1-1 uk-child-width-1-2@m" uk-grid="" uk-height-match="target: > div > div">
            <div>
              <div className={`article_img_wrap ${product.orientedImage ? 'scale_img' : ''}`}>
                <div className="uk-visible@m">
                  {product.orientedImage ? <img src={urlFor(product.image).width(Math.round(window.innerHeight + (window.innerHeight * 20 / 100))).orientation(270).url()} alt={product.title} />
                  : <img src={urlFor(product.image).url()} alt={product.title} />}
                </div>
                <div className={`uk-hidden@m ${product.orientedImage ? 'orianted-img' : ''}`}>
                  {product.orientedImage ? <img src={urlFor(product.image).orientation(180).url()} alt={product.title} />
                  : <img src={urlFor(product.image).url()} alt={product.title} />}
                </div>
              </div>
            </div>
            <div>
              <div className="content_wrap grey">
                <div className="content">
                  <h1 className="head_1">{product.title}</h1>
                  {product?.variants?.length ? <div className="variants_list">
                    {(product.variants || []).map((item, index) => {
                      if(item.price){
                        return <div key={index} className="uk-grid uk-grid-medium" uk-grid="">
                          <div className="uk-width-expand">{item.title}</div>
                          <div className="short_price">{currency === '$' && item.price ? currency: ''} {item.price} {currency !== '$' && item.price ? currency: ''}</div>
                        </div>
                      }
                      return ''
                    })}
                  </div> : ''}
                  {product?.variants !== undefined && product?.variants?.length && product?.variants.price ? <div className="order_block">
                    <div className="uk-flex uk-flex-between">
                      <div>
                        <div className="uk-width-1-1 uk-width-auto@m">
                          <div className="custom-select-wrap">
                            <button className={`custom-select uk-button uk-button-default ${error.select ? 'error' : ''}`} type="button" tabIndex="-1">
                              <span>{select.name}</span>
                              <span><img src={down} alt="Down" /></span>
                            </button>
                            <div className="select_dropdown" uk-drop="mode: click">
                              <ul style={{height: `calc(55px * ${product?.variants ? product?.variants.length : ''} + ${product?.variants ? product?.variants.length : ''}px)`}}>
                                {(product?.variants || []).map((item, index) =>
                                  <li key={index}>
                                    <a href="/" className="variant_select" data-name={item.title} data-price={item.price} onClick={e => selectHandle(e)} title={item.title}>
                                      <span className="uk-grid uk-grid-small">
                                        <span className="uk-width-4-5" >{item.title}</span>
                                      <span className="uk-width-1-5 uk-text-right" style={{textTransform: 'none'}}>{currency === '$' ? currency: ''} {item.price} {currency !== '$' ? currency: ''}</span>
                                      </span>
                                    </a>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className={`custom_number quantity ${error.count ? 'error' : ''}`}>
                          <input type="number" min="1" max="1000" step="1" onChange={(e) => setCount(+e.target.value)} value={count} />
                          <div className="quantity-nav">
                            <div className="quantity-button quantity-up" onClick={() => setCount(count + 1)}>+</div>
                            <div className="quantity-button quantity-down" onClick={() => {if(count > 0){ return setCount(count - 1)} else{ return false}}}>-</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link to={window.location.pathname +'?buy'}><button className="uk-width-1-1 uk-margin-top tm-button tm-black-button" href="/" onClick={() => onBuy()}>{loader ? <div uk-spinner="" className="uk-icon uk-spinner"></div> : ''}PŘIDAT DO KOŠÍKU</button></Link>
                  </div> : ''}
                  {!product?.variants?.length ?
                    <div className="tm-single-order">
                      <div className="tm-single-price uk-text-center uk-margin-bottom">{currency === '$' ? currency: ''} {product.price} {currency !== '$' ? currency: ''}</div>
                      <div className="uk-grid-small uk-grid" uk-grid="">
                        <div className="uk-width-1-3">
                          <div className={`custom_number quantity ${error.count ? 'error' : ''}`}>
                            <input type="number" min="1" max="1000" step="1" onChange={(e) => setCount(+e.target.value)} value={count} />
                            <div className="quantity-nav">
                              <div className="quantity-button quantity-up" onClick={() => setCount(count + 1)}>+</div>
                              <div className="quantity-button quantity-down" onClick={() => {if(count > 0){ return setCount(count - 1)} else{ return false}}}>-</div>
                            </div>
                          </div>
                        </div>
                        <div className="uk-width-2-3">
                          <Link to={window.location.pathname +'?buy'}><button className="uk-width-1-1 tm-button tm-black-button" href="/" onClick={() => onBuy()}>{loader ? <div uk-spinner="" className="uk-icon uk-spinner"></div> : ''}PŘIDAT DO KOŠÍKU</button></Link>
                        </div>
                      </div>
                    </div>

                  : ''}
                  <div className="description_product">
                    <BlockContent blocks={product.text} />
                  </div>
                  <div className="paramets">
                    <table className="uk-table uk-table-divider uk-table-small">
                      <tbody>
                        {(product.parametrs || []).map((item, index) =>
                          <tr key={index}>
                            <td>{item.title}</td>
                            <td className="uk-text-right">{item.value}</td>
                          </tr>
                        )}
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
