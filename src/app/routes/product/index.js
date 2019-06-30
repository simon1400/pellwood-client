import React, {useState, useEffect} from 'react';
import Page from '../../components/page';
import RandomArticles from '../../components/random-articles';
import ShortBlock from '../../components/small-short-cart';
import sanityClient from "../../../lib/sanity.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";


import down from '../../assets/chevron-down-light.svg'

import './style.scss'

const imageBuilder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return imageBuilder.image(source);
}

if(window.location.pathname.split('/')[1] === 'en'){
  var lang = 'en'
}else if(window.location.pathname.split('/')[1] === 'de'){
  var lang = 'de'
}else{
  var lang = 'cz'
}

{/*
 */}

const query = `{
  'products': *[_type == "product" && ${lang}.slug.current == $url] {
    ${lang},
    "linkedCarts": *[ _type == "product" && _id in [^.${lang}.linkedProducts.product_1._ref, ^.${lang}.linkedProducts.product_2._ref, ^.${lang}.linkedProducts.product_3._ref]].${lang}
  },
  'articles': *[_type == "article"].${lang}
}`;

export default ({match}) => {

  const [product, setProduct] = useState([])
  const [carts, setCarts] = useState([])
  const [articles, setArticles] = useState([])
  const [count, setCount] = useState(0)

  const [select, setSelect] = useState({
    name: 'Vybrat variantu',
    price: ''
  })

  const selectHandle = (e) => {
    e.preventDefault()
    setSelect({
      ...select,
      name: e.currentTarget.dataset.name,
      price: e.currentTarget.dataset.price
    })
  }

  const handleInput = (value, name) => {

  }

  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    setArticles(a);
  }

  useEffect(() => {
    sanityClient.fetch(query, {url: match.params.url}).then(data => {
      setProduct(data.products[0][lang])
      setCarts(data.products[0].linkedCarts)
      shuffle(data.articles)
    })
  }, [])

  if(!Array.isArray(product)){
    return (
      <Page id="product" title="Product">
      <section className="full product">
        <div className="uk-grid uk-child-width-1-1 uk-child-width-1-2@m" uk-grid="" uk-height-match="target: > div > div">
          <div>
            <div className="article_img_wrap">
              <div className="uk-visible@m">
                {product.orientedImage ? <img src={urlFor(product.image).orientation(270).url()} alt={product.title} />
                : <img src={urlFor(product.image).url()} alt={product.title} />}
              </div>
              <div className="uk-hidden@m">
                <img src={urlFor(product.image).url()} alt={product.title} />
              </div>
            </div>
          </div>
          <div>
            <div className="content_wrap grey">
              <div className="content">
                <h1 className="head_1">{product.title}</h1>
                <div className="variants_list">
                  {(product.variants || []).map((item, index) =>
                    <div key={index} className="uk-grid uk-grid-medium" uk-grid="">
                      <div className="uk-width-expand">{item.title}</div>
                      <div className="short_price">{item.price}</div>
                    </div>
                  )}
                </div>
                {product.variants !== undefined ? <div className="order_block">
                  <div className="uk-flex uk-flex-between">
                    <div>
                      <div className="uk-width-1-1 uk-width-auto@m">
                        <div className="custom-select-wrap">
                          <button className="custom-select -error uk-button uk-button-default" type="button" tabIndex="-1">
                            <span>{select.name}</span>
                            <span><img src={down} alt="Down" /></span>
                          </button>
                          <div className="select_dropdown" uk-drop="mode: click">
                            <ul style={{height: `calc(55px * ${product.variants ? product.variants.length : ''} + ${product.variants ? product.variants.length : ''}px)`}}>
                              {(product.variants || []).map((item, index) =>
                                <li key={index}>
                                  <a href="#" className="variant_select" data-name={item.title} data-price={item.price} onClick={e => selectHandle(e)} title={item.title}>
                                    <span className="uk-grid uk-grid-small">
                                      <span className="uk-width-3-5" >{item.title}</span>
                                      <span className="uk-width-2-5 uk-text-right">{item.price}</span>
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
                      <div className="custom_number quantity">
                        <input type="number" min="1" max="1000" step="1" value={count} />
                        <div className="quantity-nav">
                          <div className="quantity-button quantity-up" onClick={() => setCount(count + 1)}>+</div>
                        <div className="quantity-button quantity-down" onClick={() => {if(count > 0){ return setCount(count - 1)} else{ return false}}}>-</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="button black" href="/">PŘIDAT DO KOŠÍKU</button>
                </div> : ''}
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

      <ShortBlock data={carts}/>
      <RandomArticles data={articles} />
      </Page>
    )
  }else{
    return <div></div>
  }

}
