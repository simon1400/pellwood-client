import React, {useState, useLayoutEffect, useEffect} from 'react';
import { HashLink as Link } from "react-router-hash-link";

import './style.scss'

var lang = 'cz'
if(window.location.pathname.split('/')[1] === 'en'){
  lang = 'en'
}else if(window.location.pathname.split('/')[1] === 'de'){
  lang = 'de'
}else{
  lang = 'cz'
}

const SubMenu = ({data, articles = false}) => {

  const [baseUrl, setBaseUrl] = useState('')

  useEffect(() => {
    if(lang !== 'cz'){
      setBaseUrl(window.location.pathname.split('/')[2])
    }else{
      setBaseUrl(window.location.pathname.split('/')[1])
    }
  }, [])


  return(
    <nav className="sub_menu">
      <ul>
        {window.location.pathname.split('/')[1] === 'produkty' || window.location.pathname.split('/')[2] === 'produkty'
          ? <li uk-filter-control="" className={`sub_menu_item`}><Link to="#catalog-short" scroll={el => el.scrollIntoView({behavior: "smooth", block: "start"})}>Všechny produkty</Link></li> : ''}
        {data.length && data.map((item, index) => {
          if(!articles) {
            return <li key={index} className="sub_menu_item" uk-filter-control={`[data-category*='${item._id}']`}><Link to="#catalog-short" scroll={el => el.scrollIntoView({behavior: "smooth",block: "start"})}>{item[lang].title}</Link></li>
          }else{
            return <li key={index} className="sub_menu_item"><a href={`${lang === 'cz' ? '' : '/' + lang}/${item.slug.current}/${baseUrl}/clanek`}>{item.title}</a></li>
          }
        })}
      </ul>
    </nav>
  )
}

export default SubMenu;
