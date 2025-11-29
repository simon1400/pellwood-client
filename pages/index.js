import sanityClient from "../lib/sanity.js";
import imageUrlBuilder from "@sanity/image-url";
import Link from 'next/link'
import BlockContent from "@sanity/block-content-to-react";
import localize from '../data/localize'
import Page from '../layout/Page'
import Article from '../components/ArticleShort'
import ShortBlock from '../components/SmallShortCart'

import shuffle from '../helpers/shuffle'

const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = source => imageBuilder.image(source)

export async function getServerSideProps({locale}) {
  const {lang, currency} = localize(locale)

  const queryArticle = `*[_type == "article"] {
    "category": ${lang}.category,
    "categorySlug": *[_type == "archive" && _id == ^.${lang}.category._ref][0].${lang}.slug,
    "title": ${lang}.title,
    "slug": ${lang}.slug,
    "image": ${lang}.image
  } | order(${lang}.sort asc)`

  const data = await sanityClient.fetch(`{
    'homepage': *[_type == "homepage"] {
      ${lang},
      "carts": *[ _type == "product" && _id in [^.${lang}.recommendedProducts.product_1._ref, ^.${lang}.recommendedProducts.product_2._ref, ^.${lang}.recommendedProducts.product_3._ref]].${lang} | order(sort asc)
    }[0...10],
    'articles': ${queryArticle}
  }`)

  if(lang === 'en'){
    data.homepage[0].carts.map(item => {
      if(typeof item.price === 'string'){
        item.price.replace(/,/g, '.')
      }else if(item.variants?.length){
        item.variants = item.variants.map(variant => {
          variant.price = variant.price.replace(/,/g, '.')
          return variant
        })
      }
    })
  }

  var articlesFilteredFirst = data.articles.filter(item => item?.category._ref.includes("3252355e-13f2-4628-8db4-a90bb522713b"))
  var articlesFilteredSeccond = data.articles.filter(item => item?.category._ref.includes("53b17b89-299c-48b1-b332-26240fc0e624"))
  const articleFirst = shuffle(articlesFilteredFirst, 0)
  const articleSeccond = shuffle(articlesFilteredSeccond, 1)

  return {
    props: {
      homepage: data.homepage[0][lang],
      carts: data.homepage[0].carts,
      articleFirst,
      articleSeccond,
      lang,
      currency
    }
  }
}

const Homepage = ({
  homepage,
  carts,
  articleFirst,
  articleSeccond,
  lang,
  currency
}) => {

  return (
    <Page id="homepage" description={homepage.descriptionHead} title={homepage.titleHead} image={urlFor(homepage.image).url()}>

      <section className="homepage_slide">
        <div className="uk-inline uk-cover-container uk-height-1-1 uk-width-1-1">

          <div
            className="blanded-mix uk-width-1-1 uk-height-1-1 uk-background-cover uk-img"
            data-src={urlFor(homepage.image).width(2400).format('webp').url()}
            data-srcset={`${urlFor(homepage.image).width(400).format('webp').url()} 400w,
                      ${urlFor(homepage.image).width(640).format('webp').url()} 640w,
                      ${urlFor(homepage.image).width(900).format('webp').url()} 900w,
                      ${urlFor(homepage.image).width(1000).format('webp').url()} 1000w,
                      ${urlFor(homepage.image).width(1600).format('webp').url()} 1600w,
                      ${urlFor(homepage.image).width(2000).format('webp').url()} 2000w`}
            uk-img=""></div>
          <div className="overlay uk-position-center uk-flex uk-flex-center uk-flex-middle">
            <div >
              <h1 className="contrast" uk-scrollspy="cls: uk-animation-slide-top-small; delay: 500">{homepage.title}</h1>
              <Link href={homepage.button.url} className="tm-button tm-bare-button tm-contrast" uk-scrollspy="cls: uk-animation-slide-top; delay: 500">{homepage.button.title}</Link>
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
              <Link href={homepage.banner.url} className="big_category big_grid">
                <div className="category_wrap">
                  <div className="uk-inline uk-height-1-1 uk-width-1-1">
                    <div className="blanded-mix uk-width-1-1 uk-height-1-1 uk-background-cover uk-img"
                          data-src={urlFor(homepage.banner.image).width(2000).url()}
                          uk-img=""></div>
                    <div className="overlay uk-position-center uk-flex uk-flex-center uk-flex-middle">
                      <h2 className="category_short_name">{homepage.banner.title}</h2>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {articleFirst[0] ? <Article lang={lang} data={articleFirst[0]} firstUrl="sluzby"/> : ''}
            {articleSeccond[0] ? <Article lang={lang} data={articleSeccond[0]} firstUrl="o-nas"/> : ''}

          </div>
        </div>
      </section>
    </Page>
  )
};

export default Homepage
