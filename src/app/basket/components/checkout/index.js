import React, {useState, useEffect} from 'react'
import './style.scss'
import AnimateHeight from 'react-animate-height';


import Delivery from './delivery.js'
import Corporate from './corporate.js'
import Password from './password.js'
import Note from './note.js'
import ShipPay from './shipPay.js'

const Checkout = ({state, user, anotherAdress, companyData, password, note, deliveryMethod, paymentMethod}) => {


  const handleChange = (name, value) => {
    let newState = state[0];
    newState[name] = value;
    state[1]({...newState})
  }

  console.log(user.email);

  return(
    <div className="tm-checkout">
      <form id="checkout-form">
        <fieldset className="uk-fieldset">

          <legend className="uk-legend">Dodací údaje</legend>

          <Delivery state={state[0]} setState={state[1]} />

          <div className="uk-margin-small checkbox_item">
            <input type="checkbox" id="checkbox_another_address" onChange={() => handleChange('anotherAddressCheck', !state[0].anotherAddressCheck)} checked={state[0].anotherAddressCheck} />
            <label htmlFor="checkbox_another_address"></label>
            <label htmlFor="checkbox_another_address">Doručit na jinou adresu</label>
          </div>

          <AnimateHeight duration={ 500 } height={ state[0].anotherAddressCheck ? 'auto' : 0 } >
            <Delivery state={anotherAdress[0]} setState={anotherAdress[1]}/>
          </AnimateHeight>

          <div className="uk-margin-small checkbox_item">
            <input type="checkbox" id="checkbox_firm_data" onChange={() => handleChange('companyDataCheck', !state[0].companyDataCheck)} checked={state[0].companyDataCheck} />
            <label htmlFor="checkbox_firm_data"></label>
            <label htmlFor="checkbox_firm_data">Doplnit firemní údaje</label>
          </div>

          <AnimateHeight duration={ 500 } height={ state[0].companyDataCheck ? 'auto' : 0 } >
            <Corporate state={companyData[0]} setState={companyData[1]} />
          </AnimateHeight>

          {user.email === undefined ? (
              <div className="uk-margin-small checkbox_item">
                <input type="checkbox" id="checkbox_registration" onChange={() => handleChange('registrationCheck', !state[0].registrationCheck)} checked={state[0].registrationCheck} />
                <label htmlFor="checkbox_registration"></label>
                <label htmlFor="checkbox_registration">Založit účet pro příští objednávky</label>
              </div>,

              <AnimateHeight duration={ 500 } height={ state[0].registrationCheck ? 'auto' : 0 } >
                <Password state={password[0]} setState={password[1]}/>
              </AnimateHeight>)
            : ''
          }


          <div className="uk-margin-small checkbox_item">
            <input type="checkbox" id="checkbox_note" onChange={() => handleChange('noteCheck', !state[0].noteCheck)} checked={state[0].noteCheck} />
            <label htmlFor="checkbox_note"></label>
            <label htmlFor="checkbox_note">Poznámka k objednávce</label>
          </div>

          <AnimateHeight duration={ 500 } height={ state[0].noteCheck ? 'auto' : 0 } >
            <Note state={note[0]} setState={note[1]} />
          </AnimateHeight>

          <ShipPay delivery={deliveryMethod[0]} setDelivery={deliveryMethod[1]} payment={paymentMethod[0]} setPayment={paymentMethod[1]}/>

        </fieldset>
      </form>
    </div>
  )
}


export default Checkout
