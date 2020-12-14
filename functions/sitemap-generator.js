require("babel-register")({
  presets: ["es2015", "react"]
});

const sanityClient = require("../lib/sanity").default;
const axios = require('axios')
const router = require("./sitemap-routes").default;
const Sitemap = require("react-router-sitemap").default;


const query = `{
  'product': *[_type == "product"] {
    "en": en.slug.current,
    "cz": cz.slug.current
  },
  'category': *[_type == "archive"] {
    "en": en.slug.current,
    "cz": cz.slug.current
  },
  'article': *[_type == "article"]{
    "en": en.slug.current,
    "cz": cz.slug.current,
    "category": *[_type == "archive" && _id == ^.cz.category._ref]{
      "cz": cz.slug.current,
      "en": en.slug.current
    }
  },
}`;

async function getData() {
  const res = await sanityClient.fetch(query)
  return {
    product: res.product,
    category: res.category,
    article: res.article
  }
}

async function generateSitemap() {
  try{
    const result = await getData()

    let paramsProduct = [];
    let paramsCategory = [];
    let paramsArticles = [];

    for(var i = 0; i < result.product.length; i++) {
      paramsProduct.push({ lang: '', url: result.product[i].cz });
      paramsProduct.push({ lang: 'en', url: result.product[i].en ? result.product[i].en : '' });
    }
    for(var i = 0; i < result.category.length; i++) {
      paramsCategory.push({ lang: '', category: result.category[i].cz });
      paramsCategory.push({ lang: 'en', category: result.category[i].en });
    }
    for(var i = 0; i < result.article.length; i++) {
      paramsArticles.push({ lang: '', category: result.article[i].category[0].cz, url: result.article[i].cz });
      paramsArticles.push({ lang: 'en', category: result.article[i].category[0].en, url: result.article[i].en });
    }

    const paramsConfig = {
      "/:lang/produkt/:url": paramsProduct,
      "/:lang/:category/kategorie": paramsCategory,
      "/:lang/:url/:category/clanek": paramsArticles
    };

    var path = './public/sitemap.xml'
    if(process.env.NODE_ENV === 'prod'){
      path = './build/sitemap.xml'
    }

    return (
      new Sitemap(router)
        .applyParams(paramsConfig)
        .build("https://pellwood.com")
        .save(path)
    );
  }catch(e){
    console.log(e);
  }
}

generateSitemap();
