import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../../lib/sanity.js";
import './style.scss'

const imageBuilder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return imageBuilder.image(source);
}

const Article = ({lang, data, firstUrl, seccondUrl}) => {


  const [baseUrl, setBaseUrl] = useState('')

  useEffect(() => {
    if(lang !== 'cz'){
      setBaseUrl(seccondUrl)
    }else{
      setBaseUrl(firstUrl)
    }
  }, [])

  return(
    <div className="uk-width-1-1 uk-width-1-2@s">
      <Link to={`/${baseUrl}/${data.slug.current}`} className="big_category">
        <div className="category_wrap">
          <div className="uk-inline uk-height-1-1 uk-width-1-1">
            <div className="blanded-mix uk-width-1-1 uk-height-1-1 uk-background-cover" data-src={urlFor(data.image)} uk-img=""></div>
            <div className="overlay uk-position-center uk-flex uk-flex-center uk-flex-middle">
              <h2 className="category_short_name">{data.title}</h2>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Article
