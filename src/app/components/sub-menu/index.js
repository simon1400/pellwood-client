import React from 'react';
import {Link} from 'react-router-dom'

import './style.scss'

var lang = 'cz'
if(window.location.pathname.split('/')[1] === 'en'){
  lang = 'en'
}else if(window.location.pathname.split('/')[1] === 'de'){
  lang = 'de'
}else{
  lang = 'cz'
}

// active_sub

const SubMenu = ({data}) => {

  return(
    <nav className="sub_menu">
      <ul>
        {window.location.pathname.split('/')[1] === 'produkty' || window.location.pathname.split('/')[2] === 'produkty'
          ? <li uk-filter-control=""><Link to="/">Všechni produkty</Link></li> : ''}
        {data.map((item, index) =>
          <li key={index} uk-filter-control={`[data-category*='${item._id}']`}><Link to="/">{item[lang].title}</Link></li>
        )}
      </ul>
    </nav>
  )
}

export default SubMenu;
