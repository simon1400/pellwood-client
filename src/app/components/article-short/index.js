import React, {useState, useEffect} from 'react'
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../../lib/sanity.js";
import './style.scss'

const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = source => imageBuilder.image(source)

const Article = ({lang, data, firstUrl, seccondUrl}) => {

  const [baseUrl, setBaseUrl] = useState('')

  useEffect(() => {
    if(lang !== 'cz'){
      setBaseUrl(seccondUrl || firstUrl)
    }else{
      setBaseUrl(firstUrl)
    }
  }, [])

  const [compireTablet] = useState(window.innerWidth <= 960 && window.innerWidth > 640 ? 960 : false)
  const [compireMobile] = useState(window.innerWidth <= 640 ? 640 : false)

  return(
    <div className="uk-width-1-1 uk-width-1-2@s">
      <a href={`${lang === 'cz' ? '' : '/' + lang}/${data.slug.current}/${baseUrl}/clanek`} aria-label="Big category" className="big_category">
        <div className="category_wrap">
          <div className="uk-inline uk-height-1-1 uk-width-1-1">
            <div className="blanded-mix uk-width-1-1 uk-height-1-1 uk-background-cover" data-src={urlFor(data.image).width(compireTablet ? compireTablet * 2 : compireMobile ? compireMobile * 2 : Math.round((window.innerWidth - 120) / 2)).url()} uk-img=""></div>
            <div className="overlay uk-position-center uk-flex uk-flex-center uk-flex-middle">
              <h2 className="category_short_name">{data.title}</h2>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}

export default Article
