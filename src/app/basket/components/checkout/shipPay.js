import React from 'react'

const ShipPay = () => {
  return(
    <div className="form_container tm-payship">
      <div className="form_column">
        <legend className="uk-legend">Doprava</legend>
        <div className="uk-grid-small" uk-grid="">
          <div className="uk-width-expand">
            <div className="radio_item">
              <input type="radio" id="delivery_1" />
              <label htmlFor="delivery_1"></label>
              <label htmlFor="delivery_1">Osobní odběr na pobočce</label>
            </div>
          </div>
          <div className="tm-positive method-price">ZDARMA</div>
        </div>
        <div className="uk-grid-small" uk-grid="">
          <div className="uk-width-expand">
            <div className="radio_item">
              <input type="radio" id="delivery_2" />
              <label htmlFor="delivery_2"></label>
              <label htmlFor="delivery_2">Balík do ruky Česká pošta</label>
            </div>
          </div>
          <div className="method-price">185 Kč</div>
        </div>
        <div className="uk-grid-small" uk-grid="">
          <div className="uk-width-expand">
            <div className="radio_item">
              <input type="radio" id="delivery_3" />
              <label htmlFor="delivery_3"></label>
              <label htmlFor="delivery_3">Večerní dodaní PPL</label>
            </div>
          </div>
          <div className="method-price">250 Kč</div>
        </div>
      </div>

      <div className="form_column">
        <legend className="uk-legend">Platba</legend>
        <div className="uk-grid-small" uk-grid="">
          <div className="uk-width-expand">
            <div className="radio_item">
              <input type="radio" id="pay_1" />
              <label htmlFor="pay_1"></label>
              <label htmlFor="pay_1">Bankovní převod</label>
            </div>
          </div>
          <div className="tm-positive method-price">ZDARMA</div>
        </div>
        <div className="uk-grid-small" uk-grid="">
          <div className="uk-width-expand">
            <div className="radio_item">
              <input type="radio" id="pay_2" />
              <label htmlFor="pay_2"></label>
              <label htmlFor="pay_2">Platba kartou on-line</label>
            </div>
          </div>
          <div className="tm-positive method-price">ZDARMA</div>
        </div>
        <div className="uk-grid-small" uk-grid="">
          <div className="uk-width-expand">
            <div className="radio_item">
              <input type="radio" id="pay_3" />
              <label htmlFor="pay_3"></label>
              <label htmlFor="pay_3">Online bankovní platby</label>
            </div>
          </div>
          <div className="tm-positive method-price">ZDARMA</div>
        </div>
      </div>
    </div>
  )
}

export default ShipPay
