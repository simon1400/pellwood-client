import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Canvas from './basket/canvas'
import sanityClient from "../lib/sanity.js";

import logo from './assets/logo.svg'

if(window.location.pathname.split('/')[1] === 'en'){
  var lang = 'en'
}else if(window.location.pathname.split('/')[1] === 'de'){
  var lang = 'de'
}else{
  var lang = 'cz'
}


const query = `*[_type == "menu" && ${lang}.location == 'menu_top'].${lang}.items`;


const Header = () => {

  const [menu, setMenu] = useState([])

  useEffect(() => {
    sanityClient.fetch(query).then(data => {
      setMenu(...data)
    })
  }, [])

  // menu_active
  return(
    <Fragment>
      <Canvas />
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
                <a nohref="" className="basket_count" uk-toggle="target: #offcanvas-flip">4</a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  )
}


export default Header
