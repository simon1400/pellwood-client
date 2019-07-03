import React, {useState, useEffect} from 'react';
import Page from '../../components/page';
import Article from '../../components/article-short';
import ShortBlock from '../../components/small-short-cart';
import sanityClient from "../../../lib/sanity.js";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

import './style.scss'

const imageBuilder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return imageBuilder.image(source);
}

var lang = 'cz'
if(window.location.pathname.split('/')[1] === 'en'){
  lang = 'en'
}else if(window.location.pathname.split('/')[1] === 'de'){
  lang = 'de'
}else{
  lang = 'cz'
}
const query = `{
  'homepage': *[_type == "homepage"] {
    ${lang},
    "carts": *[ _type == "product" && _id in [^.${lang}.recommendedProducts.product_1._ref, ^.${lang}.recommendedProducts.product_2._ref, ^.${lang}.recommendedProducts.product_3._ref]].${lang}
  }[0...10],
  'articles': *[_type == "article"].${lang} | order(_createdAt asc)
}`;

export default () => {
  const [homepage, setHomepage] = useState([])
  const [carts, setCarts] = useState([])
  const [articles, setArticles] = useState([])

  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    setArticles(a);
  }

  useEffect(() => {
    sanityClient.fetch(query).then(data => {
      setHomepage(data.homepage[0][lang])
      setCarts(data.homepage[0].carts)
      shuffle(data.articles)
    })
  }, [])


  if(homepage.title !== undefined){
    return (
      <Page id="homepage" title="Uvodni stranka">

        <section className="homepage_slide">
          <div className="uk-inline uk-cover-container uk-height-1-1 uk-width-1-1">
            <div className="blanded-mix uk-width-1-1 uk-height-1-1 uk-background-cover" data-src={urlFor(homepage.image).url()} uk-img=""></div>
            <div className="overlay uk-position-center uk-flex uk-flex-center uk-flex-middle">
              <div >
                <h1 className="contrast" uk-scrollspy="cls: uk-animation-slide-top-small; delay: 500">{homepage.title}</h1>
                <a className="button bare contrast" uk-scrollspy="cls: uk-animation-slide-top; delay: 500" href={homepage.button.url}>{homepage.button.title}</a>
              </div>
            </div>
          </div>
        </section>

        <section className="description uk-flex uk-flex-middle">
          <div className="uk-container uk-container-expand">
            <div uk-scrollspy="cls: uk-animation-slide-top-small; delay: 500">
              <BlockContent blocks={homepage.content} />
            </div>
          </div>
        </section>

        <ShortBlock data={carts}/>

        <section className="section_base">
          <div className="uk-container uk-container-expand">
            <div className="uk-grid" uk-grid="" uk-scrollspy="target: > div > a; cls: uk-animation-slide-top-small; delay: 500">
              <div className="uk-width-1-1">
                <a href={homepage.banner.url} className="big_category big_grid">
                  <div className="category_wrap">
                    <div className="uk-inline uk-height-1-1 uk-width-1-1">
                      <div className="blanded-mix uk-width-1-1 uk-height-1-1 uk-background-cover" data-src={urlFor(homepage.banner.image).url()} uk-img=""></div>
                      <div className="overlay uk-position-center uk-flex uk-flex-center uk-flex-middle">
                        <h2 className="category_short_name">{homepage.banner.title}</h2>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              {articles[0] ? <Article data={articles[0]}/> : ''}
              {articles[1] ? <Article data={articles[1]}/> : ''}

            </div>
          </div>
        </section>
      </Page>
    )
  }else{
    return <div></div>
  }

};
