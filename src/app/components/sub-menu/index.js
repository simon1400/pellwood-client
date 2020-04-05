import React, {useState, useLayoutEffect, useEffect} from 'react';
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

const SubMenu = ({data}) => {

  const [responseMenu, setResponseMenu] = useState(false)
  const [width] = useWindowSize();

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
          ? <li uk-filter-control="" className="sub_menu_item"><Link to="/">Všechny produkty</Link></li> : ''}
        {data.map((item, index) =>
          <li key={index} className="sub_menu_item" uk-filter-control={`[data-category*='${item._id}']`}><Link to="/">{item[lang].title}</Link></li>
        )}
      </ul>
    </nav>
  )
}

export default SubMenu;
