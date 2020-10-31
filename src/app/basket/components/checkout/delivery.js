import React from 'react';
import translate from '../../../data/staticTranslate'
import countryData from '../../../data/country'

import localize from '../../../data/localize'
const {lang} = localize(window.location.href)

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
          <input className={state.email?.length && 'hasValue'} type="email" value={state.email} onChange={(e) => handleChange('email', e.target.value)} tabIndex="1" pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"/>
          <label>{translate.formemail[lang]}</label>
        </div>
        <div className="uk-margin input_item">
          <input className={state.name?.length && 'hasValue'} type="text" value={state.name} onChange={(e) => handleChange('name', e.target.value)} tabIndex="3" pattern="^([^ \x21-\x26\x28-\x2C\x2E-\x40\x5B-\x60\x7B-\xAC\xAE-\xBF\xF7\xFE]+)$"/>
          <label>{translate.formname[lang]}</label>
        </div>
        <div className="uk-margin select_item">
          <div uk-form-custom="target: > * > span:first-child">
            <select value={state.country} onChange={(e) => handleChange('country', e.target.value)} >
              {countryData.map((item, index) => <option key={index} value={item.name}>{item.value}</option>)}
            </select>
            <button className="uk-button uk-button-default" type="button" tabIndex="5">
              <span></span>
              <span><svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z"></path></svg></span>
            </button>
          </div>
        </div>
        <div className="uk-margin input_item">
          <input className={state.address?.length && 'hasValue'} type="text" value={state.address} onChange={(e) => handleChange('address', e.target.value)} tabIndex="7" pattern="^(.*[^0-9]+) (([1-9][0-9]*)/)?([1-9][0-9]*[a-cA-C]?)$"/>
          <label>{translate.formstreet[lang]}</label>
        </div>
      </div>

      <div className="form_column">
        <div className="uk-margin input_item">
          <input className={state.phone?.length && 'hasValue'} type="text" value={state.phone} onChange={(e) => handleChange('phone', e.target.value)} tabIndex="2" pattern="^(\+?420)? ?[0-9]{3} ?[0-9]{3} ?[0-9]{3}$"/>
          <label>{translate.formphone[lang]}</label>
        </div>
        <div className="uk-margin input_item">
          <input className={state.surname?.length && 'hasValue'} type="text" value={state.surname} onChange={(e) => handleChange('surname', e.target.value)} tabIndex="4" pattern="^([^ \x21-\x26\x28-\x2C\x2E-\x40\x5B-\x60\x7B-\xAC\xAE-\xBF\xF7\xFE]+)$"/>
          <label>{translate.formsurname[lang]}</label>
        </div>
        <div className="uk-margin input_item">
          <input className={state.city?.length && 'hasValue'} type="text" value={state.city} onChange={(e) => handleChange('city', e.target.value)} tabIndex="6" pattern="^([^ \x21-\x26\x28-\x2C\x2E-\x40\x5B-\x60\x7B-\xAC\xAE-\xBF\xF7\xFE]+)$"/>
          <label>{translate.formcity[lang]}</label>
        </div>
        <div className="uk-margin input_item">
          <input className={state.code?.length && 'hasValue'} type="text" value={state.code} onChange={(e) => handleChange('code', e.target.value)} tabIndex="8" pattern="\d{3} ?\d{2}"/>
          <label>{translate.formzip[lang]}</label>
        </div>
      </div>
    </div>
  )
}

export default Delivery
