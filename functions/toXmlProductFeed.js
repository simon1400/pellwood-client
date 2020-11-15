const toXml = data => {
  var xmlStringFeed = `<?xml version="1.0" encoding="utf-8"?>\n
  <rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
  <title>Produkty | Prémiové bubenické paličky s garantovanou váhou</title>
  <link>https://pellwood.com</link>
  <description>Padesátiletá zkušenost výroby paliček, nadšení pro práci se dřevem a láska k hudbě jsou koktejlem příčin, proč jsou paličky PELLWOOD stále oblíbenější a čím dál více bubeníků se na ně může spolehnout.</description>\n`

  const dataTransform = data.reduce((result, item) => {
   return result + `<item>
     <g:id>${item.id}</g:id>
     <title>${item.title}</title>
     <description>${item.description}</description>
     <link>${item.link}</link>
     <g:image_link>${item.image_link}</g:image_link>
     <g:availability>in stock</g:availability>
     <g:price>${item.price}</g:price>
     <g:mpn>false</g:mpn>
     <g:gtin>false</g:gtin>
     <g:identifier_exists>false</g:identifier_exists>
   </item>\n`
  }, '')

  xmlStringFeed += dataTransform
  xmlStringFeed += `</channel>
  </rss>`

  return xmlStringFeed
}

export default toXml;
