import React from 'react';
import Page from '../../components/page';
import Article from '../../components/article-short';
import ShortBlock from '../../components/small-short-cart';

import './style.scss'

export default () => {
  return (
    <Page id="homepage" title="Uvodni stranka">

      <section className="homepage_slide">
        <div className="uk-inline uk-cover-container uk-height-1-1 uk-width-1-1">
          <div className="blanded-mix uk-width-1-1 uk-height-1-1 uk-background-cover" data-src="./img/homepage-top.jpg" uk-img=""></div>
          <div className="overlay uk-position-center uk-flex uk-flex-center uk-flex-middle">
            <div >
              <h1 className="contrast" uk-scrollspy="cls: uk-animation-slide-top-small; delay: 500">Paličky pellwood s garantovanou váhou</h1>
              <a className="button bare contrast" uk-scrollspy="cls: uk-animation-slide-top; delay: 500" href="/">prohlédnout produkty</a>
            </div>
          </div>
        </div>
      </section>

      <section className="description uk-flex uk-flex-middle">
        <div className="uk-container uk-container-expand">
          <p uk-scrollspy="cls: uk-animation-slide-top-small; delay: 500">Od roku 2009 zavedla naše firma unikátní technologii která spočívá ve VÁŽENÍ DŘEVA UŽ PŘED VÝROBOU. Dřevo je pak vytříděno do váhových kategorií a každý náš model paliček má doslova přidělené dřevo s hmotností, která se nemění. Pokud si tedy koupíte paličky PELLWOOD a později si stejný typ koupíte znovu, budou mít stejnou váhu.</p>
        </div>
      </section>

      <ShortBlock />

      <section className="section_base">
        <div className="uk-container uk-container-expand">
          <div className="uk-grid" uk-grid="" uk-scrollspy="target: > div > a; cls: uk-animation-slide-top-small; delay: 500">
            <div className="uk-width-1-1">
              <a href="/" className="big_category big_grid">
                <div className="category_wrap">
                  <div className="uk-inline uk-height-1-1 uk-width-1-1">
                    <div className="blanded-mix uk-width-1-1 uk-height-1-1 uk-background-cover" data-src="./img/category_1.jpg" uk-img=""></div>
                    <div className="overlay uk-position-center uk-flex uk-flex-center uk-flex-middle">
                      <h2 className="category_short_name">paličky na zakázku</h2>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <Article />
            <Article />

          </div>
        </div>
      </section>
    </Page>
  )
};
