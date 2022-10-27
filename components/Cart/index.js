import {useState, useEffect, useRef} from 'react';
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../lib/sanity.js";
import translate from '../../data/staticTranslate'
import Link from 'next/link'
import {useRouter} from 'next/router'
const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = source => imageBuilder.image(source);

const getMin = (arr) => {
  var lowest = Number.POSITIVE_INFINITY;
  var tmp;
  for (var i = arr.length-1; i >= 0; i--) {
    tmp = arr[i].price.split(',').join('.');
    if (tmp < lowest) lowest = tmp;
  }

  return lowest
}

const localizePrice = (lang, price, currency, ifFrom = false) => {
  if(lang === 'en'){
    return `${ifFrom ? translate.from[lang] : ''} ${currency} ${price}`
  }else{
    return `${ifFrom ? translate.from[lang] : ''} ${price} ${currency}`
  }
}

const getPrice = (item, currency, lang) => {
  if(!item?.variants?.length){
    return localizePrice(lang, item.price, currency)
  }

  if(item?.variants?.length > 1){
    const min = getMin(item.variants)
    return localizePrice(lang, min, currency, true)
  }

  if(item?.variants?.length === 1){
    return localizePrice(lang, item.variants[0].price, currency)
  }

  return ''

}

const Cart = ({item, lang, currency, block}) => {

  const [price, setPrice] = useState(getPrice(item, currency, lang))
  const router = useRouter()

  const cardRef = useRef(null)

  useEffect(() => {
    setPrice(getPrice(item, currency, lang))
  })

  if(block) {
    return(
      <div ref={cardRef}>
        <Link href={`/produkt/${item.slug.current}`}>
          <a className="card_short" style={{opacity: 1}}>
            <h3 className="card_short_head">{item.title}</h3>
            <div className="cart_img">
              {cardRef.current && <img src={urlFor(item.image).width(cardRef.current?.clientWidth * 2).auto('format').url()} alt={item.title} />}
            </div>
            <span className="short_price">{price}</span>
          </a>
        </Link>
      </div>
    )
  }else{
    return (
      <li ref={cardRef}>
        <a href={`${lang !== 'cz' ? '/' + lang : ''}/produkt/${item.slug.current}`} className="card_short">
          <h3 className="card_short_head">{item.title}</h3>
          <div className="cart_img">
            {cardRef.current && <img src={urlFor(item.image).width(cardRef.current?.clientWidth * 2).auto('format').url()} alt={item.title} />}
          </div>
          <span className="short_price">{price}</span>
        </a>
      </li>
    )
  }
}

export default Cart
