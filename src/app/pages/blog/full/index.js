import React, {useState, useEffect} from 'react';
import Page from '../../../components/page';
import sanityClient from "../../../../lib/sanity.js";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";

const imageBuilder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return imageBuilder.image(source);
}


var lang = 'cz';
if(window.location.pathname.split('/')[1] === 'en'){
  lang = 'en'
}else if(window.location.pathname.split('/')[1] === 'de'){
  lang = 'de'
}else{
  lang = 'cz'
}


const query = `*[_type == "article" && ${lang}.slug.current == $url].${lang}.chapters`;

export default ({match}) => {

  const [chapters, setChapters] = useState([])

  useEffect(() => {
    sanityClient.fetch(query, {url: match.params.url}).then(data => {
      setChapters(...data)
    })
  }, [])



  if(chapters || chapters.length > 0){
    return (
      <Page id="blog" description={chapters.descriptionHead} title={chapters.titleHead}>
        {chapters.map((item, index) =>
          <section key={index} className="full">
            <div className="uk-grid uk-grid-large uk-child-width-1-1 uk-child-width-1-2@m" uk-grid="" uk-height-match="target: > div > div">
              <div>
                <div className="article_img_wrap">
                  <div uk-sticky="bottom: true; media: @m">
                    <img src={urlFor(item.image).width(window.innerWidth / 2).url()} alt={item.title} />
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
