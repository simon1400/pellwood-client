import React, { Component } from 'react';

import './style.scss'

export default class Cart extends Component {
  render() {
    return(
      <li data-tags="black" data-date="2016-06-01">
        <a href="/" className="card_short">
          <h3 className="card_short_head">Combi Stick 8A Hornbeam</h3>
          <div className="cart_img">
            <img src="./img/short_1.jpg" alt="" />
          </div>
          <span className="short_price">od 120 Kč</span>
        </a>
      </li>
    )
  }
}
