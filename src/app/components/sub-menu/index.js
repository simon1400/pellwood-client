import React, { Component } from 'react';

import './style.scss'

export default class SubMenu extends Component {
  render() {
    return(
      <nav className="sub_menu">
        <ul>
          <li className="active_sub" uk-filter-control="[data-tags*='white']"><a href="/">Paličky</a></li>
          <li uk-filter-control="[data-tags*='black']"><a href="/">Metličky</a></li>
          <li uk-filter-control="[data-tags*='blue']"><a href="/">X-line-stix</a></li>
          <li ><a href="/">Merchandise</a></li>
        </ul>
      </nav>
    )
  }
}
