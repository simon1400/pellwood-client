import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Canvas from './basket/canvas'
import sanityClient from "../lib/sanity.js";
import Cookies from 'js-cookie';

import logo from './assets/logo.svg'

var lang = 'cz'
if(window.location.pathname.split('/')[1] === 'en'){
  lang = 'en'
}else if(window.location.pathname.split('/')[1] === 'de'){
  lang = 'de'
}else{
  lang = 'cz'
}


const query = `*[_type == "menu" && ${lang}.location == 'menu_top'].${lang}.items`;


const Header = () => {

  const [menu, setMenu] = useState([])
  const [handleUpdate, setHandleUpdate] = useState(0)
  const [basketCount, setBasketCount] = useState(Cookies.getJSON('basketCount'))

  useEffect(() => {
    sanityClient.fetch(query).then(data => {
      setMenu(...data)
    })
  }, [])

  useEffect(() => {
    setBasketCount(Cookies.getJSON('basketCount'))
  }, [window.location.search, handleUpdate])

  // menu_active
  return(
    <Fragment>
      <Canvas update={setHandleUpdate}/>
      <header>
        <div className="uk-container uk-container-expand uk-height-1-1">
          <div className="uk-flex uk-flex-between uk-flex-middle uk-height-1-1">
            <Link to="/" className="logo-wrap">
              <img src={logo} alt="Pellwood" />
            </Link>
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
                  {(menu || []).map((item, index) => <li key={index}><Link to={item.menuUrl}>{item.title}</Link></li>)}
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
                <a nohref="" className="basket_count" uk-toggle="target: #offcanvas-flip">
                  {basketCount ? basketCount : 0}
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  )
}


export default Header
