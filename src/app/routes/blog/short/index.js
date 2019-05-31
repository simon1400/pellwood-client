import React from 'react';
import Page from '../../../components/page';
import SubMenu from '../../../components/sub-menu';
import Article from '../../../components/article-short';

export default () => {
  return (
    <Page id="blog" title="Blog">
    <section className="head_category head_category_articles">
      <div className="uk-container uk-container-expand">
        <SubMenu />
      </div>
    </section>


    <section className="category grey">
      <div className="uk-container uk-container-expand">
        <div className="uk-grid uk-child-width-1-1 uk-child-width-1-2@s" uk-grid="" uk-scrollspy="target: > div > a; cls: uk-animation-slide-top-small; delay: 500">
          <Article />
          <Article />
          <Article />
          <Article />
        </div>
      </div>
    </section>
    </Page>
  )
}
