import React, {useState, useContext} from 'react'
import './style.scss'
import UIkit from 'uikit'
import translate from '../../../data/staticTranslate'
import { DataStateContext } from '../../../context/dataStateContext'
import localize from '../../../data/localize'
const {lang, currency} = localize(window.location.href)

const Head = ({head}) => {

  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)

  const modal = () => {
    UIkit.modal(UIkit.util.find('#modal-login')).show();
  }

  return(
    <div className="tm-basket-head">
      <h1>{head}</h1>
      {!dataContextState?.user?.email && <a href="#modal-login" className="tm-button tm-bare-button" onClick={() => modal()}>{translate.login2[lang]}</a>}
    </div>
  )
}

export default Head
