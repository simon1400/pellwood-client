import React from 'react'

const Password = ({state, setState}) => {
  return(
    <div className="form_container">
      <div className="form_column">
        <div className="uk-margin input_item">
          <input className={state.length ? 'hasValue' : ''} type="password" value={state} onChange={(e) => setState(e.target.value)}/>
          <label>Heslo</label>
        </div>
      </div>
      <div className="form_column"></div>
    </div>
  )
}

export default Password
