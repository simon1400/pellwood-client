require("babel-register")({
  presets: ["es2015", "react"]
});

const sanityClient = require("../lib/sanity").default;
const imageUrlBuilder = require("@sanity/image-url");
const axios = require('axios')
const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = (source) => imageBuilder.image(source)

const toXml = require('./toAllData').default
fs = require('fs');

function toPlainText(blocks = []) {
  return blocks.map(block => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      return block.children.map(child => child.text).join('')
    }).join('\n\n')
}


const feedModel = (arr, products, i) => {
  var productVariants = []

  if(products[i] && products[i].variants && products[i].variants.length){
    for(var a = 0; a < products[i].variants.length; a++){
      productVariants.push({
        id: products[i].variants[a]._key+a+(i+6),
        title: products[i].title + ' - ' + products[i].variants[a].title,
        description: products[i].descriptionHead,
        titleHead: products[i].titleHead,
        parametrs: products[i].parametrs,
        text: toPlainText(products[i].text),
        link: 'https://pellwood.com/produkt/' + products[i].slug.current,
        image_link: urlFor(products[i].image).url(),
        mpn: products[i].variants[a]._key.split('-').join('')+i+a,
        price: `${products[i].variants[a].price} CZK`,
        category: products[i].category,
        orientedImage: products[i].orientedImage
      })
    }
  }else if(products[i] && products[i].price){
    arr.push({
      id: products[i]._id + '_'+i,
      title: products[i].title,
      description: products[i].descriptionHead,
      titleHead: products[i].titleHead,
      text: toPlainText(products[i].text),
      link: 'https://pellwood.com/produkt/' + products[i].slug.current,
      image_link: urlFor(products[i].image).url(),
      parametrs: products[i].parametrs,
      mpn: products[i]._id.split('-').join('')+(i+3),
      price: `${products[i].price} CZK`,
      category: products[i].category,
      orientedImage: products[i].orientedImage
    });
  }

  arr.push(...productVariants)

}

const generateSitemap = async () => {
  try{
    const products = await sanityClient.fetch(`*[_type == "product"] {
      _id,
      "title": cz.title,
      "category": *[_type == "category" && _id == ^.cz.category._ref].cz.title [0],
      "descriptionHead": cz.descriptionHead,
      "image": cz.image,
      "orientedImage": cz.orientedImage,
      "parametrs": cz.parametrs,
      "price": cz.price,
      "slug": cz.slug,
      "text": cz.text,
      "titleHead": cz.titleHead,
      "variants": cz.variants,
    }`)

    let czProducts = [];

    for(var i = 0; i < products.length; i++) {
      feedModel(czProducts, products, i)
    }

    const resultXml = toXml(czProducts)

    var path = './public/all-products.xml'

    fs.writeFile(path, resultXml, (err) => {
      if (err) return console.log(err);
      console.log(`Xml write in --> ${path}`);
    });

  }catch(e){
    console.log(e);
  }
}

generateSitemap();
