import React from 'react'
import translate from '../../../../data/staticTranslate'

import localize from '../../../../data/localize'
const {lang, currency} = localize(window.location.href)


const Password = ({state, setState}) => <div className="form_column">
  <div className="input_item">
    <input className={state.length ? 'hasValue' : ''} type="password" value={state} onChange={(e) => setState(e.target.value)}/>
    <label>{translate.formpassword[lang]}</label>
  </div>
  <div></div>
</div>


export default Password
