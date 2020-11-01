import React from 'react'
import translate from '../../../data/staticTranslate'

import localize from '../../../data/localize'
const {lang, currency} = localize(window.location.href)

const deliveryData = {
  cz: [
    {value: 'PPL standartní doručení v ČR', price: '150 Kč'},
    {value: 'PPL na Slovensko', price: '200 Kč'}
  ],
  en: [
    {value: 'DHL', price: '10 €'}
  ]
}
const paymentData = {
  cz: [
    {value: 'Online bankovní platby', price: 'ZDARMA'},
    {value: 'Platba kartou on-line', price: 'ZDARMA'}
  ],
  en: [
    {value: 'Online bank transfer', price: 'FREE'},
    {value: 'Card payment', price: 'FREE'}
  ]
}

const ShipPay = ({delivery, error, setError, setDelivery, payment, setPayment}) => {


  const onChange = (type, item) => {
    if(type === 'delivery'){
      setDelivery({value: item.value, price: item.price})
      setError({...error, delivery: false})
    }else if(type === 'payment'){
      setPayment({value: item.value, price: item.price})
      setError({...error, payment: false})
    }
  }

  return(
    <div className="form_container tm-payship">
      <div className="form_column">
        <legend className="uk-legend">{translate.delivery[lang]}</legend>

        {deliveryData[lang].map((item, index) =>
          <div key={index} className="uk-grid-small" uk-grid="">
            <div className="uk-width-expand">
              <div className="radio_item">
                <input type="radio" id={`delivery_${index}`} onChange={() => onChange('delivery', item)} checked={delivery.value === item.value ? true : false }/>
                <label htmlFor={`delivery_${index}`}></label>
                <label htmlFor={`delivery_${index}`}>{item.value}</label>
              </div>
            </div>
            <div className={`method-price ${(item.price === 'ZDARMA' || item.price === 'FREE') && 'tm-positive'}`}>{item.price}</div>
          </div>
        )}
        {error.delivery && <div className="uk-alert-danger" uk-alert=""><p>Vyberte způsob dopravy</p></div>}
      </div>

      <div className="form_column">
        <legend className="uk-legend">{translate.payment[lang]}</legend>
        {paymentData[lang].map((item, index) =>
          <div key={index} className="uk-grid-small" uk-grid="">
            <div className="uk-width-expand">
              <div className="radio_item">
                <input type="radio" id={`pay_${index}`} onChange={() => onChange('payment', item)} checked={payment.value === item.value ? true : false }/>
                <label htmlFor={`pay_${index}`}></label>
                <label htmlFor={`pay_${index}`}>{item.value}</label>
              </div>
            </div>
            <div className={`method-price ${(item.price === 'ZDARMA' || item.price === 'FREE') && 'tm-positive'}`}>{item.price}</div>
          </div>
        )}

        {error.payment && <div className="uk-alert-danger" uk-alert=""><p>Vyberte způsob platby</p></div>}

      </div>
    </div>
  )
}

export default ShipPay
