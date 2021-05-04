export default (lang, products) => {
  let controledProduct = products.filter(item => item?.title)

  if(lang === 'en'){
    controledProduct.map(item => {
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

  return controledProduct
}
