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


function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

// active_sub

const SubMenu = ({data, articles = false}) => {

  const [responseMenu, setResponseMenu] = useState(false)
  const [width] = useWindowSize();

  const [baseUrl, setBaseUrl] = useState('')

  useEffect(() => {
    if(lang !== 'cz'){
      setBaseUrl(window.location.pathname.split('/')[2])
    }else{
      setBaseUrl(window.location.pathname.split('/')[1])
    }
  }, [])

  useEffect(() => {
    reespMenu()
  }, [data.length])

  useEffect(() => {
    reespMenu()
  }, [width])

  const reespMenu = () => {
    let allItems = Object.values(document.querySelectorAll(".sub_menu_item"))
    if(allItems.length > 1){
      var sumWidth = allItems.reduce((a, b) => a + b.offsetWidth, 0)
      sumWidth += (allItems.length - 1) * 80
      if(window.innerWidth - 80 <= sumWidth){
        setResponseMenu(true)
      }else{
        setResponseMenu(false)
      }
    }
  }

  return(
    <nav className={`sub_menu ${responseMenu ? "sub_menu_responsive" : ''}`}>
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
