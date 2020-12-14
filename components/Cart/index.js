import {useState, useEffect} from 'react';
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../lib/sanity.js";
import translate from '../../data/staticTranslate'
import Link from 'next/link'
const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = source => imageBuilder.image(source);

const Cart = ({item, lang, currency, block}) => {

  const [pricesGroup, setPricesGroup] = useState(false)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    if(item?.variants?.length > 1){
      setPricesGroup(true)
      var allPrices = []
      item.variants.map(item => {
        allPrices.push(+item.price)
      })
      var minPrice = Math.min(...allPrices)
      if(lang === 'en'){
        setPrice((Math.round(minPrice * 100) / 100).toFixed(2))
      }else{
        setPrice(minPrice)
      }
    }else if(item?.variants?.length === 1){
      if(lang === 'en'){
        setPrice((Math.round(item.variants[0].price * 100) / 100).toFixed(2))
      }else{
        setPrice(item.variants[0].price)
      }
    }else if (!item?.variants?.length){
      if(lang === 'en'){
        setPrice((Math.round(+item.price * 100) / 100).toFixed(2))
      }else{
        setPrice(item.price)
      }
    }else{
      setPrice('')
    }
  }, [])

  if(block) {
    return(
      <div>
        <Link href={`/produkt/${item.slug.current}`}>
          <a className="card_short" style={{opacity: 1}}>
            <h3 className="card_short_head">{item.title}</h3>
            <div className="cart_img">
              <img src={urlFor(item.image).width().url()} alt={item.title} />
            </div>
            {!!price && <span className="short_price">
              {pricesGroup && `${translate.from[lang]} ${price} ${currency}`}
              {(!pricesGroup || !item?.variants?.length) && `${price} ${currency}`}
            </span>}
          </a>
        </Link>
      </div>
    )
  }else{
    return (
      <li data-category={item.category?._ref}>
        <a href={`${lang !== 'cz' ? '/' + lang : ''}/produkt/${item.slug.current}`} className="card_short">
          <h3 className="card_short_head">{item.title}</h3>
          <div className="cart_img">
            <img src={urlFor(item.image).url()} alt={item.title} />
          </div>
          {!!price &&
            <span className="short_price">
              {pricesGroup && `${translate.from[lang]} ${price} ${currency}`}
              {(!pricesGroup || !item?.variants?.length) && `${price} ${currency}`}
            </span>}
        </a>
      </li>
    )
  }
}

export default Cart
