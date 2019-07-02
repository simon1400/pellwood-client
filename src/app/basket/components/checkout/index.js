import React from 'react'
import './style.scss'


import Delivery from './delivery.js'
import Corporate from './corporate.js'
import Password from './password.js'
import Note from './note.js'
import ShipPay from './shipPay.js'

const Checkout = () => {



  return(
    <div className="tm-checkout">
      <form id="checkout-form">
        <fieldset className="uk-fieldset">

          <legend className="uk-legend">Dodací údaje</legend>

          <Delivery />

          <div className="uk-margin-small checkbox_item">
            <input type="checkbox" id="checkbox_another_address" />
            <label htmlFor="checkbox_another_address"></label>
            <label htmlFor="checkbox_another_address">Doručit na jinou adresu</label>
          </div>

          <Delivery />

          <div className="uk-margin-small checkbox_item">
            <input type="checkbox" id="checkbox_firm_data" />
            <label htmlFor="checkbox_firm_data"></label>
            <label htmlFor="checkbox_firm_data">Doplnit firemní údaje</label>
          </div>

          <Corporate />

          <div className="uk-margin-small checkbox_item">
            <input type="checkbox" id="checkbox_registration" />
            <label htmlFor="checkbox_registration"></label>
            <label htmlFor="checkbox_registration">Založit účet pro příští objednávky</label>
          </div>

          <Password />

          <div className="uk-margin-small checkbox_item">
            <input type="checkbox" id="checkbox_note" />
            <label htmlFor="checkbox_note"></label>
            <label htmlFor="checkbox_note">Poznámka k objednávce</label>
          </div>

          <Note />

          <ShipPay />

        </fieldset>
      </form>
    </div>
  )
}


export default Checkout
