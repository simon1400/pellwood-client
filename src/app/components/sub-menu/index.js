import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import './style.scss'

if(window.location.pathname.split('/')[1] === 'en'){
  var lang = 'en'
}else if(window.location.pathname.split('/')[1] === 'de'){
  var lang = 'de'
}else{
  var lang = 'cz'
}

// active_sub

const SubMenu = ({data}) => {

  return(
    <nav className="sub_menu">
      <ul>
        {data.map((item, index) =>
          <li key={index} uk-filter-control={`[data-category*='${item._id}']`}><Link to="/">{item[lang].title}</Link></li>
        )}
      </ul>
    </nav>
  )
}

export default SubMenu;
