import React, {useContext} from 'react'
import './style.scss'
import {modal, util} from 'uikit'
import { DataStateContext } from '../../../context/dataStateContext'
import translate from '../../../data/staticTranslate'
import localize from '../../../data/localize'
const {lang} = localize(window.location.href)

const Head = ({head}) => {

  const { dataContextState } = useContext(DataStateContext)

  const toggleModal = () => {
    modal('#modal-login').show();
  }

  return (
    <div className="tm-basket-head">
      <h1>{head}</h1>
      {!dataContextState?.user?.email && <a href="#modal-login" className="tm-button tm-bare-button" onClick={() => toggleModal()}>{translate.login2[lang]}</a>}
    </div>
  )
}

export default Head
