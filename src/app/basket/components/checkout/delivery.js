import React from 'react';

const Delivery = () => {
  return (
    <div className="form_container">
      <div className="form_column">
        <div className="uk-margin input_item">
          <input type="text" />
          <label>E-mail</label>
        </div>
        <div className="uk-margin input_item">
          <input type="text" />
          <label>Jméno</label>
        </div>
        <div className="uk-margin select_item">
          <div uk-form-custom="target: > * > span:first-child">
            <select>
              <option value="">Please select...</option>
              <option value="1">Option 01</option>
              <option value="2">Option 02</option>
              <option value="3">Option 03</option>
              <option value="4">Option 04</option>
            </select>
            <button className="uk-button uk-button-default" type="button" tabIndex="-1">
              <span></span>
              <span><svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z"></path></svg></span>
            </button>
          </div>
        </div>
        <div className="uk-margin input_item">
          <input type="text" />
          <label>Ulice a č. p.</label>
        </div>
      </div>

      <div className="form_column">
        <div className="uk-margin input_item">
          <input type="text" />
          <label>Telefon</label>
        </div>
        <div className="uk-margin input_item">
          <input type="text" />
          <label>Příjmení</label>
        </div>
        <div className="uk-margin input_item">
          <input type="text" />
          <label>Město</label>
        </div>
        <div className="uk-margin input_item">
          <input type="text" />
          <label>PSČ</label>
        </div>
      </div>
    </div>
  )
}

export default Delivery
