import React from 'react'
import translate from '../../../data/staticTranslate'

import localize from '../../../data/localize'
const {lang, currency} = localize(window.location.href)

const Corporate = ({state, setState}) => {

  const handleChange = (name, value) => {
    let newState = state;
    newState[name] = value;
    setState({...newState})
  }

  return (
    <div className="form_container">
      <div className="form_column">
        <div className="uk-margin input_item">
          <input className={state.companyName?.length && 'hasValue'} type="text" value={state.companyName} onChange={(e) => handleChange('companyName', e.target.value)} />
          <label>Obchodní {translate.formname[lang]}</label>
        </div>
        <div className="uk-margin input_item">
          <input className={state.ico?.length && 'hasValue'} type="text" value={state.ico} onChange={(e) => handleChange('ico', e.target.value)} />
          <label>IČO</label>
        </div>
        <div className="uk-margin input_item">
          <input className={state.dic?.length && 'hasValue'} type="text" value={state.dic} onChange={(e) => handleChange('dic', e.target.value)} />
          <label>DIČ</label>
        </div>
      </div>
      <div className="form_column"></div>
    </div>
  )
}


export default Corporate
