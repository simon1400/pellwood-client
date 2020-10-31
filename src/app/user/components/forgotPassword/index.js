import React, {useState} from 'react'
import {modal} from 'uikit'
import './style.scss'
import {Link} from 'react-router-dom'
import translate from '../../../data/staticTranslate'

import localize from '../../../data/localize'
const {lang, currency} = localize(window.location.href)

const ForgotPassword = () => {


  const [email, setEmail] = useState('')

  const [error, setError] = useState({})

  const closeModal = () => {
    modal('#forgot-password').hide();
  }

  const handleInput = (e, type) => {
    if(type === 'email'){
      setError({ ...error, loginEmail: false})
      setEmail(e.target.value)
    }
  }

  const forgotPassword = e => {
    e.preventDefault()
  }

  return(
    <div id="forgot-password" className="uk-flex-top" uk-modal="">
      <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

        <div className="tm-canvas-head" style={{marginTop: 0}}>
          <h2>{translate.forgottenpassword[lang]}</h2>
          <button className="tm-canvas-close uk-close-large" type="button" uk-close="" onClick={e => closeModal()}></button>
        </div>

        <div className="login_form">
          <form onSubmit={e => forgotPassword(e)}>

            {error.loginEmail === 'notExist' && <div className="uk-alert-danger" uk-alert=""><p>Zadaliste spatne email nebo heslo</p></div>}
            {error.loginEmail === 'exist' && <div className="uk-alert-danger" uk-alert=""><p>Uzivatel s timto emailem uz existuje</p></div>}
            {(error.loginEmail === 'empty' || error.loginPassword === 'empty') && <div className="uk-alert-danger" uk-alert=""><p>Vyplňte všechna pole</p></div>}

            <div className="uk-margin input_item">
              <input className={`${email.length && 'hasValue'} ${error.loginEmail && 'invalid'}`} type="email" value={email} onChange={e => handleInput(e, 'email')} tabIndex="1" />
              <label>{translate.formemail[lang]}</label>
            </div>

            <button type="submit" className="tm-button tm-black-button uk-width-1-1">Odeslat nove heslo</button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default ForgotPassword
