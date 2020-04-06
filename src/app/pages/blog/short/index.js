import React, {useState, useEffect} from 'react';
import Page from '../../../components/page';
import SubMenu from '../../../components/sub-menu';
import Article from '../../../components/article-short';

import sanityClient from "../../../../lib/sanity.js";

var firstUrl = window.location.pathname.split('/')[1],
    seccondUrl = window.location.pathname.split('/')[2]

var lang = 'cz'
if(firstUrl === 'en'){
  lang = 'en'
}else if(firstUrl === 'de'){
  lang = 'de'
}else{
  lang = 'cz'
}

const archive = `*[_type == "archive" && '${firstUrl}' == ${lang}.slug.current] {
  _id,
  titleHead,
  descriptionHead
}`;


const query = `*[_type == "article" && $id == ${lang}.category._ref].${lang} {
  title,
  image,
  slug
} | order(sort asc)`;



export default () => {

  const [articles, setArticles] = useState([])
  const [archives, setArchives] = useState([])
  const [id, setId] = useState([])

  useEffect(() => {
    sanityClient.fetch(archive).then(data => {
      setId(data[0]._id)
      setArchives(data[0])
    })
  }, [])

  useEffect(() => {
    sanityClient.fetch(query, {id: id}).then(data => {
      setArticles(data)
    })
  }, [id])

  return (
    <Page id="blog" description={archives.descriptionHead} title={archives.titleHead}>
      <section className="head_category head_category_articles">
        <div className="uk-container uk-container-expand">
           <SubMenu data={articles} articles/>
        </div>
      </section>

      <section className="category grey">
        <div className="uk-container uk-container-expand">
          <div className="uk-grid uk-child-width-1-1 uk-child-width-1-2@s" uk-grid="" uk-scrollspy="target: > div > a; cls: uk-animation-slide-top-small; delay: 500">
            {(articles || []).map((item, index) => <Article key={index} lang={lang} data={item} firstUrl={firstUrl} seccondUrl={seccondUrl}/>)}
          </div>
        </div>
      </section>
    </Page>
  )
}
