import React, {useState, useEffect} from 'react';
import Page from '../../components/page';
import Article from '../../components/article-short';
import ShortBlock from '../../components/small-short-cart';
import sanityClient from "../../../lib/sanity.js";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import Cart from '../../components/cart'

import './style.scss'

const imageBuilder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return imageBuilder.image(source);
}

var lang = 'cz', currency = 'Kč'
if(window.location.pathname.split('/')[1] === 'en'){
  lang = 'en';
  currency = '$';
}else if(window.location.pathname.split('/')[1] === 'de'){
  lang = 'de';
  currency = '&euro;';
}else{
  lang = 'cz';
  currency = 'Kč';
}

const query = `{
  'homepage': *[_type == "homepage"] {
    ${lang},
    "carts": *[ _type == "product" && _id in [^.${lang}.recommendedProducts.product_1._ref, ^.${lang}.recommendedProducts.product_2._ref, ^.${lang}.recommendedProducts.product_3._ref]].${lang} | order(sort asc)
  }[0...10],
  'articles': *[_type == "article"].${lang} | order(sort asc)
}`;

export default () => {
  const [homepage, setHomepage] = useState([])
  const [carts, setCarts] = useState([])
  const [articleFirst, setArticleFirst] = useState([])
  const [articleSeccond, setArticleSeccond] = useState([])

  const shuffle = (a, count) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }

    if(!count) setArticleFirst(a);
    else setArticleSeccond(a);

  }

  useEffect(() => {
    sanityClient.fetch(query).then(data => {
      setHomepage(data.homepage[0][lang])
      setCarts(data.homepage[0].carts)
      var articlesFilteredFirst = data.articles.filter(item => item?.category._ref.includes("3252355e-13f2-4628-8db4-a90bb522713b"))
      shuffle(articlesFilteredFirst, 0)
      var articlesFilteredSeccond = data.articles.filter(item => item?.category._ref.includes("53b17b89-299c-48b1-b332-26240fc0e624"))
      shuffle(articlesFilteredSeccond, 1)
    })

  }, [])

  if(homepage?.title !== undefined){
    return (
      <Page id="homepage" description={homepage.descriptionHead} title={homepage.titleHead}>

        <section className="homepage_slide">
          <div className="uk-inline uk-cover-container uk-height-1-1 uk-width-1-1">
            <div className="blanded-mix uk-width-1-1 uk-height-1-1 uk-background-cover" data-src={urlFor(homepage.image).width(Math.round(window.innerWidth)).url()} uk-img=""></div>
            <div className="overlay uk-position-center uk-flex uk-flex-center uk-flex-middle">
              <div >
                <h1 className="contrast" uk-scrollspy="cls: uk-animation-slide-top-small; delay: 500">{homepage.title}</h1>
                <a className="tm-button tm-bare-button tm-contrast" uk-scrollspy="cls: uk-animation-slide-top; delay: 500" href={homepage.button.url}>{homepage.button.title}</a>
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

        {carts.length && <ShortBlock data={carts} lang={lang} currency={currency}/>}

        <section className="section_base">
          <div className="uk-container uk-container-expand">
            <div className="uk-grid" uk-grid="" uk-scrollspy="target: > div > a; cls: uk-animation-slide-top-small; delay: 500">
              <div className="uk-width-1-1">
                <a href={homepage.banner.url} className="big_category big_grid">
                  <div className="category_wrap">
                    <div className="uk-inline uk-height-1-1 uk-width-1-1">
                      <div className="blanded-mix uk-width-1-1 uk-height-1-1 uk-background-cover" data-src={urlFor(homepage.banner.image).width(Math.round(window.innerWidth - 80)).url()} uk-img=""></div>
                      <div className="overlay uk-position-center uk-flex uk-flex-center uk-flex-middle">
                        <h2 className="category_short_name">{homepage.banner.title}</h2>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              {articleFirst[0] ? <Article lang={lang} data={articleFirst[0]} firstUrl="sluzby"/> : ''}
              {articleSeccond[0] ? <Article lang={lang} data={articleSeccond[0]} firstUrl="o-nas"/> : ''}

            </div>
          </div>
        </section>
      </Page>
    )
  }else{
    return <div></div>
  }

};
