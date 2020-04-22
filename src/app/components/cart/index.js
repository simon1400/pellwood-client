import React, {useState, useEffect} from 'react';
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../../lib/sanity.js";
import './style.scss'

const imageBuilder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return imageBuilder.image(source);
}

const Cart = ({item, currency}) => {

  const [pricesGroup, setPricesGroup] = useState(false)
  const [price, setPrice] = useState(0)

  const [compireTablet] = useState(window.innerWidth <= 960 && window.innerWidth > 640 ? 960 : false)
  const [compireMobile] = useState(window.innerWidth <= 640 ? 640 : false)

  useEffect(() => {
    if(item.variants && item.variants.length > 1){
      setPricesGroup(true)
      var allPrices = []
      item.variants.map(item => {
        allPrices.push(+item.price)
      })
      var minPrice = Math.min(...allPrices)
      setPrice(minPrice)
    }else if(item.variants && item.variants.length === 1){
      setPrice(item.variants[0].price)
    }else{
      setPrice(item.price)
    }
  }, [])

  return(
    <li data-category={item?.category?._ref} data-price={item?.variants && item?.variants?.length ? item?.variants[0]?.price : ''}>
      <a href={`/produkt/${item.slug.current}`} className="card_short">
        <h3 className="card_short_head">{item.title}</h3>
        <div className="cart_img">
          <img src={urlFor(item.image).width(compireTablet ? compireTablet * 2 : compireMobile ? compireMobile * 2 : Math.round(((window.innerWidth - 160) / 3) * 2)).url()} alt={item.title} />
        </div>
        <span className="short_price">{item.variants && item.variants.length ? pricesGroup ? 'od '+price : price : price} {currency}</span>
      </a>
    </li>
  )
}

export default Cart
