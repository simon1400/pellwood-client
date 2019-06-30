import React from 'react';
import {Link} from 'react-router-dom'
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../../lib/sanity.js";
import './style.scss'

const imageBuilder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return imageBuilder.image(source);
}

const Cart = ({item}) => {

  return(
    <li data-category={item.category._ref} data-price={item.variants.length ? item.variants[0].price : ''}>
      <a href={`/product/${item.slug.current}`} className="card_short">
        <h3 className="card_short_head">{item.title}</h3>
        <div className="cart_img">
          <img src={urlFor(item.image).url()} alt={item.title} />
        </div>
        <span className="short_price">{item.variants.length ? item.variants[0].price : ''}</span>
      </a>
    </li>
  )
}

export default Cart
