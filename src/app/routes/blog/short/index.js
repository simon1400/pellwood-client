import React, {useState, useEffect} from 'react';
import Page from '../../../components/page';
import SubMenu from '../../../components/sub-menu';
import Article from '../../../components/article-short';

import sanityClient from "../../../../lib/sanity.js";

var lang = 'cz'
if(window.location.pathname.split('/')[1] === 'en'){
  lang = 'en'
}else if(window.location.pathname.split('/')[1] === 'de'){
  lang = 'de'
}else{
  lang = 'cz'
}

const query = `*[_type == "article"].${lang} {
  title,
  image,
  slug
}`;

{/* <SubMenu data={articles}/> */}

export default () => {

  const [articles, setArticles] = useState([])

  useEffect(() => {
    sanityClient.fetch(query).then(data => {
      setArticles(data)
    })
  }, [])

  return (
    <Page id="blog" title="Blog">
    <section className="head_category head_category_articles">
      <div className="uk-container uk-container-expand">

      </div>
    </section>


    <section className="category grey">
      <div className="uk-container uk-container-expand">
        <div className="uk-grid uk-child-width-1-1 uk-child-width-1-2@s" uk-grid="" uk-scrollspy="target: > div > a; cls: uk-animation-slide-top-small; delay: 500">
          {(articles || []).map((item, index) => <Article key={index} data={item}/>)}
        </div>
      </div>
    </section>
    </Page>
  )
}
