import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Canvas from '../basket/canvas'
import sanityClient from "../../lib/sanity.js";
import Login from '../user/components/login'
import axios from 'axios'
import UIkit from 'uikit'
import translate from '../data/staticTranslate'

import logo from '../assets/logo.svg'

import localize from '../data/localize'
const {lang, currency} = localize(window.location.href)

const query = `*[_type == "archive" && !(_id == '3cc07543-ce81-4ad2-ace0-8bf754217065')] {
  "title": ${lang}.title,
  "slug": ${lang}.slug,
  "sort": ${lang}.sort
} | order(sort asc)`;


const Header = ({history}) => {

  const [menu, setMenu] = useState([])
  const [handleUpdate, setHandleUpdate] = useState(0)
  const [basketCount, setBasketCount] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginUser, setLoginUser] = useState(false)
  const [hamburger, setHamburger] = useState(false)
  const [error, setError] = useState({
    loginEmail: false,
    loginPassword: false
  })

  useEffect(() => {
    if(JSON.parse(localStorage.getItem('user'))){
      setLoginUser(true)
    }
    sanityClient.fetch(query).then(data => {
      setMenu(data)
    })

  }, [])

  useEffect(() => {
    setBasketCount(JSON.parse(localStorage.getItem('basketCount')))
  }, [window.location.search, handleUpdate])


  const onRegister = e => {
    e.preventDefault()

    if(!email && !password){
      setError({ ...error, loginEmail: 'empty', loginPassword: 'empty' })
      return
    }else if(!email){
      setError({ ...error, loginEmail: 'empty' })
      return
    }else if(!password){
      setError({ ...error, loginPassword: 'empty' })
      return
    }

    var registerData = {
      email,
      password
    }

    axios.post('/api/userCreate', registerData).then(res => {

      if(res.data.error === 'email'){
        setError({ ...error, loginEmail: 'exist' })
      }else if(res.data.error && res.data.error.email){
        setError({ ...error, loginEmail: 'empty' })
      }else if(res.data.error && res.data.error.password){
        setError({ ...error, loginPassword: 'empty' })
      }else{
        axios.post('/api/sendRegistration', {email: res.data.data.email}).then(res => console.log('send mail'))
        localStorage.setItem('user', JSON.stringify(res.data.data))
        setLoginUser(true)
        window.location.pathname = "/user"
      }

    }).catch(err => {
      console.log(err);
    })
  }

  const onLogin = e => {
    e.preventDefault()

    if(!email && !password){
      setError({ ...error, loginEmail: 'empty', loginPassword: 'empty' })
      return
    }else if(!email){
      setError({ ...error, loginEmail: 'empty' })
      return
    }else if(!password){
      setError({ ...error, loginPassword: 'empty' })
      return
    }

    var loginData = {
      email,
      password
    }

    axios.post('/api/login', loginData).then(res => {
      localStorage.setItem('user', JSON.stringify(res.data.data))
      setLoginUser(true)
      UIkit.modal(UIkit.util.find('#modal-login')).hide();
    }).catch(err => {
      console.log(err);
      setError({ ...error, loginEmail: 'notExist' })
    })
  }

  const handleHamburger = () => {
    if(hamburger){
      document.body.style.overflow = 'scroll'
    }else{
      document.body.style.overflow = 'hidden'
    }

    setHamburger(!hamburger)
  }

  return(
    <>
      <Canvas update={setHandleUpdate} currency={currency}/>
      <Login onLogin={onLogin} email={email} password={password} setEmail={setEmail} setPassword={setPassword} onRegister={onRegister} error={error} setError={setError}/>
      <header>
        <div className="uk-container uk-container-expand uk-height-1-1">
          <div className="uk-flex uk-flex-between uk-flex-middle uk-height-1-1">
            <a href={`/${lang === 'cz' ? '' : lang}`} className="logo-wrap">
              <img src={logo} alt="Pellwood" />
            </a>
            <div className="uk-text-right uk-width-expand uk-hidden@m">
              <button className={`hamburger hamburger--spin ${hamburger ? 'is-active' : ''}`} onClick={() => handleHamburger()} type="button">
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
            <div className={`top-nav ${hamburger ? 'menu-active' : ''}`}>
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
                  {loginUser
                    ? <Link to="/user">Účet</Link>
                    : <a href="#modal-login" uk-toggle="">Přihlašení</a>
                  }
                </div>
              </div>
            </div>
            <div className="function-button-wrap">
              <div className="lang-nav uk-visible@m">
                <nav>
                  <ul>
                    <li className={lang === 'cz' ? "menu_active" : undefined}><a href="/">cs</a></li>
                    <li className={lang === 'en' ? "menu_active" : undefined}><a href="/en">en</a></li>
                  </ul>
                </nav>
              </div>
              <div className="user-area">
                <div className="login">
                  {loginUser ? <Link to="/user" className="uk-visible@m">Účet</Link> : <a href="#modal-login" className="uk-visible@m" uk-toggle="">{translate.login[lang]}</a>}
                  <a nohref="" href="/" className="basket_count" uk-toggle="target: #offcanvas-flip">
                    {basketCount ? basketCount : JSON.parse(localStorage.getItem('basketCount')) ? JSON.parse(localStorage.getItem('basketCount')) : 0}
                  </a>
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
