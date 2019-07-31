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

  useEffect(() => {
    if(item.variants.length > 1){
      setPricesGroup(true)
      var allPrices = []
      item.variants.map(item => {
        allPrices.push(+item.price)
      })
      var minPrice = Math.min(...allPrices)
      setPrice(minPrice)
    }else if(item.variants.length === 1){
      setPrice(item.variants[0].price)
    }else{
      setPrice(item.price)
    }
  }, [])

  return(
    <li data-category={item.category._ref} data-price={item.variants.length ? item.variants[0].price : ''}>
      <a href={`/product/${item.slug.current}`} className="card_short">
        <h3 className="card_short_head">{item.title}</h3>
        <div className="cart_img">
          <img src={urlFor(item.image).url()} alt={item.title} />
        </div>
        <span className="short_price">{item.variants.length ? pricesGroup ? 'od '+price : price : price} {currency}</span>
      </a>
    </li>
  )
}

export default Cart
