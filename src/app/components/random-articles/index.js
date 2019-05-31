import React, { Component } from 'react';
import Article from '../article-short'

export default class RandomArticles extends Component {
  render() {
    return(
      <section className="section_base">
        <div className="uk-container uk-container-expand">
          <div className="uk-grid" uk-grid="" uk-scrollspy="target: > div > a; cls: uk-animation-slide-top-small; delay: 500">
            <Article />
            <Article />
          </div>
        </div>
      </section>
    )
  }
}
