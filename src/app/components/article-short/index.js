import React, { Component } from 'react'

import './style.scss'

export default class Article extends Component {
  render() {
    return(
      <div className="uk-width-1-1 uk-width-1-2@s">
        <a href="/" className="big_category">
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
    )
  }
}
