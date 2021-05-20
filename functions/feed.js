require("babel-register")({
  presets: ["es2015", "react"]
});

const sanityClient = require("../lib/sanity").default;
const imageUrlBuilder = require("@sanity/image-url");
const axios = require('axios')
const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = (source) => imageBuilder.image(source)

const toXml = require('./toXmlProductFeed').default
const toXmlHeureka = require('./toXmlHeurekaFeed').default
const toXmlZbozi = require('./toXmlZboziFeed').default
fs = require('fs');


const feedModel = (lang, arr, products, i) => {
  var productVariants = []

  if(products[i][lang] && products[i][lang].variants && products[i][lang].variants.length){
    for(var a = 0; a < products[i][lang].variants.length; a++){
      productVariants.push({
        id: products[i]._id.slice(0, products[i]._id.length / 2) + '_'+lang + products[i][lang].variants[a]._key+'_'+lang,
        title: products[i][lang].title + ' - ' + products[i][lang].variants[a].title,
        description: products[i][lang].descriptionHead,
        parametrs: products[i][lang].parametrs,
        link: `https://pellwood.com/produkt/${lang == 'cz' ? '' : 'en/'}${products[i][lang].slug.current}`,
        image_link: urlFor(products[i][lang].image).url(),
        mpn: products[i][lang].variants[a]._key.split('-').join('')+i+a,
        availability: 'in_stock',
        price: `${products[i][lang].variants[a].price} ${lang == 'cz' ? 'CZK' : 'EUR'}`
      })
    }
  }else if(products[i][lang] && products[i][lang].price){
    arr.push({
      id: products[i]._id + '_'+lang,
      title: products[i][lang].title,
      description: products[i][lang].descriptionHead,
      link: `https://pellwood.com/produkt/${lang == 'cz' ? '' : 'en/'}${products[i][lang].slug.current}`,
      image_link: urlFor(products[i][lang].image).url(),
      parametrs: products[i][lang].parametrs,
      availability: 'in_stock',
      mpn: products[i]._id.split('-').join('')+lang+(i+3),
      price: `${products[i][lang].price} ${lang == 'cz' ? 'CZK' : 'EUR'}`
    });
  }

  arr.push(...productVariants)

}

const generateSitemap = async () => {
  try{
    const products = await sanityClient.fetch(`*[_type == "product"] {_id, en,cz}`)

    let enProducts = [];
    let czProducts = [];

    for(var i = 0; i < products.length; i++) {
      feedModel('cz', czProducts, products, i)
      feedModel('en', enProducts, products, i)
    }

    const resultXmlCz = toXml(czProducts)
    const resultXmlEn = toXml(enProducts)
    const resultXmlHeurekaCz = toXmlHeureka(czProducts)
    const resultXmlZboziCz = toXmlZbozi(czProducts)

    var pathcz = './public/google-feed-cz.xml'
    var pathen = './public/google-feed-en.xml'
    var pathCzHeureka = './public/heureka-feed-cz.xml'
    var pathCzZbozi = './public/zbozi-feed-cz.xml'

    fs.writeFile(pathcz, resultXmlCz, (err) => {
      if (err) return console.log(err);
      console.log(`Xml write in --> ${pathcz}`);
    });
    fs.writeFile(pathen, resultXmlEn, (err) => {
      if (err) return console.log(err);
      console.log(`Xml write in --> ${pathen}`);
    });
    fs.writeFile(pathCzHeureka, resultXmlHeurekaCz, (err) => {
      if (err) return console.log(err);
      console.log(`Xml write in --> ${pathCzHeureka}`);
    });
    fs.writeFile(pathCzZbozi, resultXmlZboziCz, (err) => {
      if (err) return console.log(err);
      console.log(`Xml write in --> ${pathCzZbozi}`);
    });

  }catch(e){
    console.log(e);
  }
}

generateSitemap();
