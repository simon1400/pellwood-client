import React from 'react';
import Page from '../../components/page';
import RandomArticles from '../../components/random-articles';
import Cart from '../../components/cart';
import SubMenu from '../../components/sub-menu';

import './style.scss'

export default () => {
  return (
    <Page id="homepage" title="Catalog">
    <section className="head_category">
      <div className="uk-container uk-container-expand">
        <div className="content_head_wrap">
          <h1>Prvotřídní bubenické paličky PELLWOOD</h1>
          <p>Od roku 2009 zavedla naše firma unikátní technologii která spočívá ve VÁŽENÍ DŘEVA UŽ PŘED VÝROBOU. Dřevo je pak vytříděno do váhových kategorií a každý náš model paliček má doslova přidělené dřevo s hmotností</p>
        </div>
      </div>
    </section>


    <section className="category grey" uk-filter="target: .js-filter">
      <div className="uk-container uk-container-expand">
        <div className="category_menu uk-flex uk-flex-between uk-flex-middle uk-flex-wrap">
          <div className="uk-flex uk-flex-middle uk-flex-wrap">
            <SubMenu />
            <div className="search_wrap">
              <div className="input_animation">
                <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="search" className="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z"></path></svg>
                <input className="effect-9 search_input" type="text" placeholder="Hledat..." />
                <span className="focus-border">
                  <i></i>
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="custom-select-wrap">
              <button className="custom-select uk-button uk-button-default" type="button" tabIndex="-1">
                <span>seřadit podle cenys eřadit podle ceny</span>
                <span><img src="/img/chevron-down-light.svg" alt="" /></span>
              </button>
              <div className="select_dropdown" uk-drop="mode: click">
                <ul>
                  <li uk-filter-control="sort: data-date"><a href="#" title="seřadit podle cenys eřadit podle ceny"><span>seřadit podle cenys eřadit podle ceny</span></a></li>
                  <li uk-filter-control="sort: data-date; order: desc"><a href="#" title="seřadit podle nejlevnejsi"><span>seřadit podle nejlevnejsi</span></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="uk-container uk-container-expand">
        <ul className="js-filter uk-grid uk-child-width-1-1 uk-child-width-1-3@m uk-child-width-1-2@s" uk-grid="" uk-scrollspy="target: > li > a; cls: uk-animation-slide-top-small; delay: 500">
          <Cart />
          <Cart />
          <Cart />
          <Cart />
          <Cart />
          <Cart />
          <Cart />
          <Cart />
          <Cart />
        </ul>
      </div>
    </section>


    <RandomArticles />
    </Page>
  )
}
