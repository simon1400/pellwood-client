import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Canvas from './basket/canvas'
import sanityClient from "../lib/sanity.js";
import Login from './user/components/login'
import axios from 'axios'
import UIkit from 'uikit'

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
  const [basketCount, setBasketCount] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginUser, setLoginUser] = useState(false)



  useEffect(() => {
    if(JSON.parse(localStorage.getItem('user'))){
      setLoginUser(true)
    }
    sanityClient.fetch(query).then(data => {
      setMenu(...data)
    })
  }, [])

  useEffect(() => {
    setBasketCount(JSON.parse(localStorage.getItem('basketCount')))
  }, [window.location.search, handleUpdate])


  const onRegister = e => {
    e.preventDefault()
    var registerData = {
      email,
      password,
      phone: '',
      name: '',
      surname: '',
      country: '',
      city: '',
      address: '',
      code: ''
    }
    axios.post('/.netlify/functions/userCreate', registerData).then(res => {
      localStorage.setItem('user', JSON.stringify(res.data.data))
      setLoginUser(true)
      window.location.pathname = "/user"
    }).catch(err => {
      console.log(err);
    })
  }

  const onLogin = e => {
    e.preventDefault()
    var loginData = {
      email,
      password
    }
    axios.post('/.netlify/functions/login', loginData).then(res => {
      localStorage.setItem('user', JSON.stringify(res.data.data))
      setLoginUser(true)
      UIkit.modal(UIkit.util.find('#modal-login')).hide();
    }).catch(err => {
      console.log(err);
    })
  }

  // menu_active
  return(
    <Fragment>
      <Canvas update={setHandleUpdate}/>
      <Login onLogin={onLogin} email={email} password={password} setEmail={setEmail} setPassword={setPassword} onRegister={onRegister}/>
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
                {loginUser ? <Link to="/user" className="uk-visible@m">Účet</Link> : <a href="#modal-login" uk-toggle="">Přihlašení</a>}
                <a nohref="" className="basket_count" uk-toggle="target: #offcanvas-flip">
                  {basketCount ? basketCount : JSON.parse(localStorage.getItem('basketCount')) ? JSON.parse(localStorage.getItem('basketCount')) : 0}
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
