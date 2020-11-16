require("babel-register")({
  presets: ["es2015", "react"]
});

const sanityClient = require("../src/lib/sanity").default;
const imageUrlBuilder = require("@sanity/image-url");
const axios = require('axios')
const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = (source) => imageBuilder.image(source)
const toXml = require('./toXmlProductFeed').default
fs = require('fs');

async function generateSitemap() {
  try{
    const products = await sanityClient.fetch(`*[_type == "product"] {_id, en,cz}`)

    let enProducts = [];
    let czProducts = [];

    for(var i = 0; i < products.length; i++) {

      var productCzVariants = []

      if(products[i].cz.variants && products[i].cz.variants.length){
        for(var a = 0; a < products[i].cz.variants.length; a++){
          productCzVariants.push({
            id: products[i].cz.variants[a]._key+a+(i+6)+'_cz',
            title: products[i].cz.title + ' - ' + products[i].cz.variants[a].title,
            description: products[i].cz.descriptionHead,
            link: 'https://pellwood.com/produkt/' + products[i].cz.slug.current,
            image_link: urlFor(products[i].cz.image).url(),
            mpn: products[i].cz.variants[a]._key.split('-').join('')+i+a,
            availability: 'in_stock',
            price: products[i].cz.variants[a].price + ' ' + 'CZK'
          })
        }
      }else if(products[i].cz.price){
        czProducts.push({
          id: products[i]._id + '_cz'+i,
          title: products[i].cz.title,
          description: products[i].cz.descriptionHead,
          link: 'https://pellwood.com/produkt/' + products[i].cz.slug.current,
          image_link: urlFor(products[i].cz.image).url(),
          availability: 'in_stock',
          mpn: products[i]._id.split('-').join('') + 'cz'+(i+3),
          price: products[i].cz.price + ' ' + 'CZK'
        });
      }

      czProducts.push(...productCzVariants)

      var productEnVariants = []

      if(products[i].en && products[i].en.variants && products[i].en.variants.length){
        for(var a = 0; a < products[i].en.variants.length; a++){
          productEnVariants.push({
            id: products[i].en.variants[a]._key+a+(i*3)+'_en',
            title: products[i].en.title + ' - ' + products[i].en.variants[a].title,
            description: products[i].en.descriptionHead,
            link: 'https://pellwood.com/en/produkt/' + products[i].en.slug.current,
            image_link: urlFor(products[i].en.image).url(),
            mpn: products[i].en.variants[a]._key.split('-').join('')+(a+i+3),
            availability: 'in_stock',
            price: products[i].en.variants[a].price.toString().split(',').join('.') + ' ' + 'EUR'
          })
        }
      }else if(products[i].en && products[i].en.price){
        enProducts.push({
          id: products[i]._id + '_en'+i,
          title: products[i].en.title,
          description: products[i].en.descriptionHead,
          link: 'https://pellwood.com/en/produkt/' + products[i].en.slug.current,
          image_link: urlFor(products[i].en.image).url(),
          availability: 'in_stock',
          mpn: products[i]._id.split('-').join('') + 'en'+(i+5),
          price: products[i].en.price.toString().split(',').join('.') + ' ' + 'EUR'
        });
      }

      enProducts.push(...productEnVariants)
    }


    const resultXmlCz = toXml(czProducts)
    const resultXmlEn = toXml(enProducts)
    var pathcz = './public/google-feed-cz.xml'
    var pathen = './public/google-feed-en.xml'
    if(process.env.NODE_ENV === 'prod'){
      pathcz = './build/google-feed-cz.xml'
      pathen = './build/google-feed-en.xml'
    }
    fs.writeFile(pathcz, resultXmlCz, (err) => {
      if (err) return console.log(err);
      console.log(`Xml write in --> ${pathcz}`);
    });
    fs.writeFile(pathen, resultXmlEn, (err) => {
      if (err) return console.log(err);
      console.log(`Xml write in --> ${pathen}`);
    });

  }catch(e){
    console.log(e);
  }
}

generateSitemap();
