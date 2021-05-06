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
     <ITEM_ID>${item.mpn}</ITEM_ID>
     <NAME>${item.title}</NAME>
     <DESCRIPTION_HEAD>${item.description}</DESCRIPTION_HEAD>
     <TITLE_HEAD>${item.description}</TITLE_HEAD>
     <URL>${item.link}</URL>
     <TEXT>${item.text}</TEXT>
     <IMGURL>${item.image_link}</IMGURL>
     <PRICE>${item.price.slice(0, -4)}</PRICE>
     ${paramStr}
     <CATEGORY>${item.category}</CATEGORY>
     <ORIENTED_IMG>${item.orientedImage}</ORIENTED_IMG>
   </SHOPITEM>\n`
  }, '')

  xmlStringFeed += dataTransform
  xmlStringFeed += `</SHOP>`

  return xmlStringFeed
}

export default toXml;
