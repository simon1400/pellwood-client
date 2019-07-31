import React from 'react';
import Article from '../article-short'

const RandomArticles = ({lang, articleFirst, articleSeccond}) => {

  return(
    <section className="section_base">
      <div className="uk-container uk-container-expand">
        <div className="uk-grid" uk-grid="" uk-scrollspy="target: > div > a; cls: uk-animation-slide-top-small; delay: 500">
          {articleFirst[0] ? <Article lang={lang} data={articleFirst[0]} firstUrl="sluzby"/> : ''}
          {articleSeccond[0] ? <Article lang={lang} data={articleSeccond[0]} firstUrl="o-nas"/> : ''}
        </div>
      </div>
    </section>
  )
}

export default RandomArticles
