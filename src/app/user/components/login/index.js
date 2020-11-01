import React, {useState, useEffect} from 'react'
import {modal, util} from 'uikit'
import './style.scss'
import {Link} from 'react-router-dom'
import translate from '../../../data/staticTranslate'
import validationForm from '../../../function/validationForm'
import axios from 'axios'

import localize from '../../../data/localize'
const {lang, currency} = localize(window.location.href)

const Login = ({setLoginUser}) => {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({
    email: false,
    password: false
  })



  const closeModal = () => {
    modal('#modal-login').hide();
  }

  const handleInput = (e, type) => {
    if(type === 'email'){
      setError({ ...error, email: false})
      setEmail(e.target.value)
    }else if(type === 'password'){
      setError({ ...error, password: false})
      setPassword(e.target.value)
    }
  }

  const onBlur = (type) => {
    if(validationForm('email', {email}, error, setError)){
      return true
    }
    if(type === 'password' && password.length < 8 && password.length > 0){
      setError({ ...error, password: true})
      return true
    }
    return false
  }

  const forgotPassword = e => {
    e.preventDefault()
    modal('#modal-login').hide();
    modal('#forgot-password').show();
  }

  const onLogin = e => {
    e.preventDefault()

    if(onBlur('email') || onBlur('password')){
      return
    }

    axios.post('/api/login', { email, password }).then(res => {
      localStorage.setItem('user', JSON.stringify(res.data.data))
      setLoginUser(true)
      modal('#modal-login').hide();
    }).catch(err => {
      console.log(err.response);
      setError({ ...error, email: 'notExist' })
    })
  }

  const onRegister = e => {
    e.preventDefault()

    console.log(onBlur('email'));
    console.log(onBlur('password'));
    if(onBlur('email') || onBlur('password')){
      return
    }

    axios.post('/api/userCreate', { email, password }).then(res => {
      if(res.data.error === 'email'){ setError({ ...error, email: 'exist' })
      }else if(res.data?.error?.email){ setError({ ...error, email: 'empty' })
      }else if(res.data?.error?.password){ setError({ ...error, password: 'empty' })
      }else{
        // axios.post('/api/sendRegistration', {email: res.data.data.email}).then(res => console.log('send mail'))
        localStorage.setItem('user', JSON.stringify(res.data.data))
        setLoginUser(true)
        window.location.pathname = "/user"
      }

    }).catch(err => {
      console.log(err);
    })
  }

  return(
    <div id="modal-login" className="uk-flex-top" uk-modal="">
      <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

        <div className="tm-canvas-head">
          <h2>{translate.login[lang]}</h2>
          <button className="tm-canvas-close uk-close-large" type="button" uk-close="" onClick={e => closeModal()}></button>
        </div>

        <div className="login_form">
          <form onSubmit={e => onLogin(e)}>
            {error.email === 'notExist' && <div className="uk-alert-danger" uk-alert="">
              <p>Zadaliste spatne email nebo heslo</p>
            </div>}

            {error.email === 'exist' && <div className="uk-alert-danger" uk-alert="">
              <p>Uzivatel s timto emailem uz existuje</p>
            </div>}

            {(error.email === 'empty' || error.password === 'empty') && <div className="uk-alert-danger" uk-alert="">
                <p>Vyplňte všechna pole</p>
              </div>}

            <div className="uk-margin input_item">
              <input
                className={`${email.length && 'hasValue'} ${!!error.email && 'invalid'}`}
                type="email"
                value={email}
                onBlur={() => onBlur('email')}
                onChange={e => handleInput(e, 'email')}
                tabIndex="1" />
              <label>{translate.formemail[lang]}</label>
            </div>
            <div className="uk-margin input_item">
              <input
                className={`${password.length && 'hasValue'} ${(error.password || error.email === 'notExist') && 'invalid'}`}
                type="password"
                onBlur={() => onBlur('password')}
                value={password}
                onChange={e => handleInput(e, 'password')}
                tabIndex="2"/>
              <label>{translate.formpassword[lang]}</label>
            </div>
            <button type="submit" className="tm-button tm-black-button uk-width-1-1">{translate.login[lang]}</button>
            <a href="/" onClick={e => forgotPassword(e)} className="tm-button tm-bare-button tm-button-text uk-width-1-1"><span>{translate.forgottenpassword[lang]}</span></a>
            <hr />
            <p>{translate.notyetaccount[lang]}</p>
            <button className="tm-button tm-bare-button uk-width-1-1" onClick={e => onRegister(e)}><span>{translate.registration[lang]}</span></button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Login
