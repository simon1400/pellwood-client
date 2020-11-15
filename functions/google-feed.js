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
            id: products[i].cz.variants[a]._key + '_cz_' + products[i]._id,
            title: products[i].cz.title + ' - ' + products[i].cz.variants[a].title,
            description: products[i].cz.descriptionHead,
            link: 'https://pellwood.com/produkt/' + products[i].cz.slug.current,
            image_link: urlFor(products[i].cz.image).url(),
            availability: 'in_stock',
            price: products[i].cz.variants[a].price + ' ' + 'CZK'
          })
        }
      }else if(products[i].cz.price){
        czProducts.push({
          id: products[i]._id + '_cz',
          title: products[i].cz.title,
          description: products[i].cz.descriptionHead,
          link: 'https://pellwood.com/produkt/' + products[i].cz.slug.current,
          image_link: urlFor(products[i].cz.image).url(),
          availability: 'in_stock',
          price: products[i].cz.price + ' ' + 'CZK'
        });
      }

      czProducts.push(...productCzVariants)

      var productEnVariants = []

      if(products[i].en && products[i].en.variants && products[i].en.variants.length){
        for(var a = 0; a < products[i].en.variants.length; a++){
          productEnVariants.push({
            id: products[i].en.variants[a]._key + '_en_' + products[i]._id,
            title: products[i].en.title + ' - ' + products[i].en.variants[a].title,
            description: products[i].en.descriptionHead,
            link: 'https://pellwood.com/en/produkt/' + products[i].en.slug.current,
            image_link: urlFor(products[i].en.image).url(),
            availability: 'in_stock',
            price: products[i].en.variants[a].price.toString().split(',').join('.') + ' ' + 'EUR'
          })
        }
      }else if(products[i].en && products[i].en.price){
        enProducts.push({
          id: products[i]._id + '_en',
          title: products[i].en.title,
          description: products[i].en.descriptionHead,
          link: 'https://pellwood.com/en/produkt/' + products[i].en.slug.current,
          image_link: urlFor(products[i].en.image).url(),
          availability: 'in_stock',
          price: products[i].en.price.toString().split(',').join('.') + ' ' + 'EUR'
        });
      }

      enProducts.push(...productEnVariants)
    }


    const allProductsFeed = [...czProducts, ...enProducts]
    const resultXml = toXml(allProductsFeed)
    var path = './public/google-product-feed.xml'
    if(process.env.NODE_ENV === 'prod'){
      path = './build/google-product-feed.xml'
    }
    fs.writeFile(path, resultXml, (err) => {
      if (err) return console.log(err);
      console.log(`Xml write in --> ${path}`);
    });

  }catch(e){
    console.log(e);
  }
}

generateSitemap();
