import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Canvas from '../basket/canvas'
import sanityClient from "../../lib/sanity.js";
import {AxiosAPI} from '../restClient'
import UIkit from 'uikit'
import translate from '../data/staticTranslate'
import { DataStateContext } from '../context/dataStateContext'

import logo from '../assets/logo.svg'

import localize from '../data/localize'
const {lang, currency} = localize(window.location.href)

const query = `*[_type == "archive" && !(_id == '3cc07543-ce81-4ad2-ace0-8bf754217065')] {
  "title": ${lang}.title,
  "slug": ${lang}.slug,
  "sort": ${lang}.sort
} | order(sort asc)`;


const Header = ({history}) => {

  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)
  const [menu, setMenu] = useState([])
  const [basketCount, setBasketCount] = useState(0)
  const [hamburger, setHamburger] = useState(false)

  useEffect(() => {
    sanityClient.fetch(query).then(data => {
      setMenu(data)
    })
  }, [])

  useEffect(() => {
    setBasketCount(dataContextState.basketCount)
  }, [dataContextState.basketCount])

  const handleHamburger = () => {
    if(hamburger){
      document.body.style.overflow = 'scroll'
    }else{
      document.body.style.overflow = 'hidden'
    }

    setHamburger(!hamburger)
  }

  const changeLanguage = (e, url) => {
    e.preventDefault()
    localStorage.clear()
    window.location.href = url
  }

  return(
    <>
      <Canvas currency={currency}/>
      <header>
        <div className="uk-container uk-container-expand uk-height-1-1">
          <div className="uk-flex uk-flex-between uk-flex-middle uk-height-1-1">
            <a href={`/${lang === 'cz' ? '' : lang}`} className="logo-wrap uk-width-auto">
              <img src={logo} alt="Pellwood" />
            </a>
            <div className="uk-text-right uk-width-expand uk-hidden@m">
              <button className={`hamburger hamburger--spin ${hamburger ? 'is-active' : ''}`} onClick={() => handleHamburger()} type="button">
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
            <div className={`top-nav uk-width-expand ${hamburger ? 'menu-active' : ''}`}>
              <nav>
                <ul>
                  <li className={history.location.pathname.indexOf('/produkty') >= 0 ? 'active-menu-top' : ''}><a href={`${lang === 'cz' ? '' : '/' + lang}/produkty`}>{translate.products[lang]}</a></li>
                  {(menu || []).map((item, index) => <li key={index} className={history.location.pathname.indexOf(item?.slug?.current) >= 0 ? 'active-menu-top' : ''}><a href={`${lang === 'cz' ? '' : '/' + lang}/${item?.slug?.current}/kategorie`}>{item.title}</a></li>)}
                </ul>
              </nav>
              <div className="lang-nav uk-hidden@m">
                <nav>
                  <ul>
                    <li className={lang === 'cz' ? "menu_active" : undefined}><a href="/">cs</a></li>
                    <li className={lang === 'en' ? "menu_active" : undefined}><a href="/en">en</a></li>
                  </ul>
                </nav>
              </div>
              <div className="user-area uk-hidden@m">
                <div className="login">
                  {dataContextState.user?.email ? <Link to={`${lang !== 'cz' ? '/' + lang : ''}/user`}>{translate.account[lang]}</Link> : <a href="#modal-login" uk-toggle="">Přihlašení</a>}
                </div>
              </div>
            </div>
            <div className="uk-flex function-button-wrap uk-width-auto">
              <div className="lang-nav uk-visible@m">
                <nav>
                  <ul>
                    <li className={lang === 'cz' ? "menu_active" : undefined}><a href="/" onClick={e => changeLanguage(e, '/')}>cs</a></li>
                    <li className={lang === 'en' ? "menu_active" : undefined}><a href="/en" onClick={e => changeLanguage(e, '/en')}>en</a></li>
                  </ul>
                </nav>
              </div>
              <div className="user-area">
                <div className="login">
                  {dataContextState.user?.email ? <Link to={`${lang !== 'cz' ? '/' + lang : ''}/user`} className="uk-visible@m">{translate.account[lang]}</Link> : <a href="#modal-login" className="uk-visible@m" uk-toggle="">{translate.login[lang]}</a>}
                  <a nohref="" href="/" className="basket_count" uk-toggle="target: #offcanvas-flip">{basketCount}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}


export default withRouter(Header)
