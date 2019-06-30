import React from 'react';
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../../lib/sanity.js";
import './style.scss'

const imageBuilder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return imageBuilder.image(source);
}

const Cart = ({item}) => {
  return(
    <li data-tags="black" data-date="2016-06-01">
      <a href={item.slug.current} className="card_short">
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
