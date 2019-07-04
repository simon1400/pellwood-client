import React from 'react';

const Delivery = ({state, setState}) => {

  const handleChange = (name, value) => {
    let newState = state;
    newState[name] = value;
    setState({...newState})
  }

  return (
    <div className="form_container">
      <div className="form_column">
        <div className="uk-margin input_item">
          <input className={state.email.length ? 'hasValue' : ''} type="text" value={state.email} onChange={(e) => handleChange('email', e.target.value)} tabIndex="1"/>
          <label>E-mail</label>
        </div>
        <div className="uk-margin input_item">
          <input className={state.name.length ? 'hasValue' : ''} type="text" value={state.name} onChange={(e) => handleChange('name', e.target.value)} tabIndex="3"/>
          <label>Jméno</label>
        </div>
        <div className="uk-margin select_item">
          <div uk-form-custom="target: > * > span:first-child">
            <select value={state.country} onChange={(e) => handleChange('country', e.target.value)} >
              <option value="">Please select...</option>
              <option value="1">Option 01</option>
              <option value="2">Option 02</option>
              <option value="3">Option 03</option>
              <option value="4">Option 04</option>
            </select>
            <button className="uk-button uk-button-default" type="button" tabIndex="5">
              <span></span>
              <span><svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z"></path></svg></span>
            </button>
          </div>
        </div>
        <div className="uk-margin input_item">
          <input className={state.address.length ? 'hasValue' : ''} type="text" value={state.address} onChange={(e) => handleChange('address', e.target.value)} tabIndex="7"/>
          <label>Ulice a č. p.</label>
        </div>
      </div>

      <div className="form_column">
        <div className="uk-margin input_item">
          <input className={state.phone.length ? 'hasValue' : ''} type="text" value={state.phone} onChange={(e) => handleChange('phone', e.target.value)} tabIndex="2"/>
          <label>Telefon</label>
        </div>
        <div className="uk-margin input_item">
          <input className={state.surname.length ? 'hasValue' : ''} type="text" value={state.surname} onChange={(e) => handleChange('surname', e.target.value)} tabIndex="4"/>
          <label>Příjmení</label>
        </div>
        <div className="uk-margin input_item">
          <input className={state.city.length ? 'hasValue' : ''} type="text" value={state.city} onChange={(e) => handleChange('city', e.target.value)} tabIndex="6"/>
          <label>Město</label>
        </div>
        <div className="uk-margin input_item">
          <input className={state.code.length ? 'hasValue' : ''} type="text" value={state.code} onChange={(e) => handleChange('code', e.target.value)} tabIndex="8"/>
          <label>PSČ</label>
        </div>
      </div>
    </div>
  )
}

export default Delivery
