import React from 'react';
import Article from '../article-short'

const RandomArticles = ({data}) => {

  return(
    <section className="section_base">
      <div className="uk-container uk-container-expand">
        <div className="uk-grid" uk-grid="" uk-scrollspy="target: > div > a; cls: uk-animation-slide-top-small; delay: 500">
          {data[0] ? <Article data={data[0]}/> : ''}
          {data[1] ? <Article data={data[1]}/> : ''}
        </div>
      </div>
    </section>
  )
}

export default RandomArticles
