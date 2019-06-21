import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
import Canvas from './basket/canvas'

import logo from './assets/logo.svg'

export default () => (
  <Fragment>
    <Canvas />
    <header>
      <div className="uk-container uk-container-expand uk-height-1-1">
        <div className="uk-flex uk-flex-between uk-flex-middle uk-height-1-1">
          <a href="/" className="logo-wrap">
            <img src={logo} alt="" />
          </a>
          <div className="uk-text-right uk-width-expand uk-hidden@m">
            <button className="hamburger hamburger--spin" type="button">
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
          <div className="top-nav">
            <nav>
              <ul>
                <li className="menu_active"><a href="/category.html">Katalog</a></li>
                <li><a href="/articles.html">Clanky</a></li>
                <li><a href="/article_full.html">Clanek</a></li>
                <li><a href="/product.html">Product</a></li>
              </ul>
            </nav>
            <div className="lang-nav uk-hidden@m">
              <nav>
                <ul>
                  <li className="menu_active"><a href="/">cz</a></li>
                  <li><a href="/">en</a></li>
                  <li><a href="/">de</a></li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="lang-nav uk-visible@m">
            <nav>
              <ul>
                <li className="menu_active"><a href="/">cz</a></li>
                <li><a href="/">en</a></li>
                <li><a href="/">de</a></li>
              </ul>
            </nav>
          </div>
          <div className="user-area">
            <div className="login">
              <a href="/" className="uk-visible@m">Účet</a>
              <a nohref="" className="basket_count" uk-toggle="target: #offcanvas-flip">4</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  </Fragment>
);
