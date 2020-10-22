import React from 'react'
import './style.scss'
import UIkit from 'uikit'
import translate from '../../../data/staticTranslate'

import localize from '../../../data/localize'
const {lang, currency} = localize(window.location.href)

const Head = ({head, user}) => {

  const modal = () => {
    UIkit.modal(UIkit.util.find('#modal-login')).show();
  }

  return(
    <div className="tm-basket-head">
      <h1>{head}</h1>
      {user.email === undefined ? <a href="#modal-login" className="tm-button tm-bare-button" onClick={() => modal()}>{translate.login2[lang]}</a> : ''}
    </div>
  )
}

export default Head
