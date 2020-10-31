import React from 'react'
import {modal, util} from 'uikit'
import './style.scss'
import {Link} from 'react-router-dom'
import translate from '../../../data/staticTranslate'

import localize from '../../../data/localize'
const {lang, currency} = localize(window.location.href)

const Login = ({email, password, setEmail, setPassword, onRegister, onLogin, error, setError}) => {

  const closeModal = () => {
    modal('#modal-login').hide();
  }

  const handleInput = (e, type) => {
    if(type === 'email'){
      setError({ ...error, loginEmail: false})
      setEmail(e.target.value)
    }else if(type === 'password'){
      setError({ ...error, loginPassword: false})
      setPassword(e.target.value)
    }
  }

  const forgotPassword = e => {
    e.preventDefault()
    modal('#modal-login').hide();
    modal(util.find('#forgot-password')).show();
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
            {error.loginEmail === 'notExist' && <div className="uk-alert-danger" uk-alert="">
              <p>Zadaliste spatne email nebo heslo</p>
            </div>}

            {error.loginEmail === 'exist' && <div className="uk-alert-danger" uk-alert="">
              <p>Uzivatel s timto emailem uz existuje</p>
            </div>}

            {(error.loginEmail === 'empty' || error.loginPassword === 'empty') && <div className="uk-alert-danger" uk-alert="">
                <p>Vyplňte všechna pole</p>
              </div>}

            <div className="uk-margin input_item">
              <input className={`${email.length && 'hasValue'} ${error.loginEmail && 'invalid'}`} type="email" value={email} onChange={e => handleInput(e, 'email')} tabIndex="1" />
              <label>{translate.formemail[lang]}</label>
            </div>
            <div className="uk-margin input_item">
              <input className={`${password.length && 'hasValue'} ${(error.loginPassword || error.loginEmail === 'notExist') && 'invalid'}`} type="password" value={password} onChange={e => handleInput(e, 'password')} tabIndex="2"/>
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
