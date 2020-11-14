require("babel-register")({
  presets: ["es2015", "react"]
});

const sanityClient = require("./src/lib/sanity");
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
  const res = await axios.get(`https://ejvonubx.apicdn.sanity.io/v1/data/query/production?query=${encodeURIComponent(query)}`)
  return {
    product: res.data.result.product,
    category: res.data.result.category,
    article: res.data.result.article
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

    return (
      new Sitemap(router)
        .applyParams(paramsConfig)
        .build("https://pellwood.com")
        .save("./public/sitemap.xml")
    );
  }catch(e){
    console.log(e);
  }
}

generateSitemap();
