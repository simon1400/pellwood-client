import React, {useState, useEffect} from 'react';
import Page from '../../../layout/page';
import sanityClient from "../../../../lib/sanity.js";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import localize from '../../../data/localize'
const {lang} = localize(window.location.href)

const imageBuilder = imageUrlBuilder(sanityClient);
const urlFor = source => imageBuilder.image(source)

const query = `*[_type == "article" && ${lang}.slug.current == $url]{
  "chapters": ${lang}.chapters,
  "titleHead": ${lang}.titleHead,
  "descriptionHead": ${lang}.descriptionHead
}`;

export default ({match}) => {

  const [chapters, setChapters] = useState([])
  const [tablet] = useState(window.innerWidth <= 960 && window.innerWidth > 640)
  const [mobile] = useState(window.innerWidth <= 640)

  useEffect(() => {
    sanityClient.fetch(query, {url: match.params.url}).then(data => {
      if(!data.length){
        window.location.href = '/not-found'
      }
      setChapters(data[0])
    })
  }, [])

  if(Object.keys(chapters).length){
    return (
      <Page id="blog" description={chapters.descriptionHead} title={chapters.titleHead} image={urlFor(chapters.chapters[0].image).url()}>
        {chapters.chapters.map((item, index) =>
          <section key={index} className="full">
            <div className="uk-grid uk-grid-large uk-child-width-1-1 uk-child-width-1-2@m" uk-grid="" uk-height-match="target: > div > div">
              <div>
                <div className="article_img_wrap">
                  <div>
                    <img
                      className="uk-img"
                      uk-img=""
                      data-src={urlFor(item.image).width(Math.round(window.innerWidth / 2)).format('webp').url()}
                      data-srcset={`${urlFor(item.image).width(400).format('webp').url()} 400w,
                                    ${urlFor(item.image).width(640).format('webp').url()} 640w,
                                    ${urlFor(item.image).width(900).format('webp').url()} 900w,
                                    ${urlFor(item.image).width(500).format('webp').url()} 1000w,
                                    ${urlFor(item.image).width(1000).format('webp').url()} 2000w`}
                      alt={item.title} />
                  </div>
                </div>
              </div>
              <div>
                <div className="content_wrap grey">
                  <div>
                    <div className="content">
                      {!index && <h1 className="head_1">{item.title}</h1>}
                      {!!index && <h2 className="head_1">{item.title}</h2>}
                      <BlockContent blocks={item.text} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </Page>
    )
  }else{
    return(
      <div></div>
    )
  }

}
