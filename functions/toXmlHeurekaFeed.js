const toXml = data => {
  var xmlStringFeed = `<?xml version="1.0" encoding="utf-8"?>
  <SHOP>\n`
  var paramStr;
  const dataTransform = data.reduce((result, item) => {
    paramStr = ''
    if(item.parametrs && item.parametrs.length){
      item.parametrs.map(itemParameter => {
        paramStr += `\n
                    <PARAM>
                      <PARAM_NAME>${itemParameter.title}</PARAM_NAME>
                      <VAL>${itemParameter.value}</VAL>
                    </PARAM>\n`
      })
    }


   return result + `\n<SHOPITEM>
     <ITEM_ID>${item.id}</ITEM_ID>

     <PRODUCTNAME>PELLWOOD | ${item.title}</PRODUCTNAME>
     <PRODUCT>PELLWOOD | ${item.title}</PRODUCT>
     <DESCRIPTION>${item.description}</DESCRIPTION>
     <URL>${item.link}</URL>
     <IMGURL>${item.image_link}</IMGURL>
     <PRICE_VAT>${item.price}</PRICE_VAT>
     ${paramStr}
     <MANUFACTURER>Pellwood</MANUFACTURER>
     <DELIVERY_DATE>0</DELIVERY_DATE>
     <EAN>${item.mpn}</EAN>
     <CATEGORYTEXT>Paličky</CATEGORYTEXT>
     <CATEGORY>
       <CATEGORY_ID>1535</CATEGORY_ID>
       <CATEGORY_NAME>Paličky</CATEGORY_NAME>
       <CATEGORY_FULLNAME>Heureka.cz | Hobby | Hudební nástroje | Bicí nástroje | Paličky</CATEGORY_FULLNAME>
     </CATEGORY>
   </SHOPITEM>\n`
  }, '')

  xmlStringFeed += dataTransform
  xmlStringFeed += `</SHOP>`

  return xmlStringFeed
}

export default toXml;
