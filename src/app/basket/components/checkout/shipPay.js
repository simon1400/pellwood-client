import React from 'react'

const deliveryData = [
  {value: 'Osobní odběr na pobočce', price: 'ZDARMA'},
  {value: 'Balík do ruky Česká pošta', price: '185 Kč'},
  {value: 'Večerní dodaní PPL', price: '250 Kč'}
];
const paymentData = [
  {value: 'Bankovní převod', price: 'ZDARMA'},
  {value: 'Platba kartou on-line', price: 'ZDARMA'},
  {value: 'Online bankovní platby', price: 'ZDARMA'}
];

const ShipPay = ({delivery, error, setDelivery, payment, setPayment}) => {

  return(
    <div className="form_container tm-payship">
      <div className="form_column">
        <legend className="uk-legend">Doprava</legend>

        {deliveryData.map((item, index) =>
          <div key={index} className="uk-grid-small" uk-grid="">
            <div className="uk-width-expand">
              <div className="radio_item">
                <input type="radio" id={`delivery_${index}`} onChange={() => setDelivery({value: item.value, price: item.price})} checked={delivery.value === item.value ? true : false }/>
                <label htmlFor={`delivery_${index}`}></label>
                <label htmlFor={`delivery_${index}`}>{item.value}</label>
              </div>
            </div>
            <div className={`method-price ${item.price === 'ZDARMA' ? 'tm-positive' : ''}`}>{item.price}</div>
          </div>
        )}
        {error.delivery ? <div className="uk-alert-danger" uk-alert="">
          <p>Prosim vyberte spusob dopravy</p>
        </div> : ''}
      </div>

      <div className="form_column">
        <legend className="uk-legend">Platba</legend>
        {paymentData.map((item, index) =>
          <div key={index} className="uk-grid-small" uk-grid="">
            <div className="uk-width-expand">
              <div className="radio_item">
                <input type="radio" id={`pay_${index}`} onChange={() => setPayment({value: item.value, price: item.price})} checked={payment.value === item.value ? true : false }/>
                <label htmlFor={`pay_${index}`}></label>
                <label htmlFor={`pay_${index}`}>{item.value}</label>
              </div>
            </div>
            <div className={`method-price ${item.price === 'ZDARMA' ? 'tm-positive' : ''}`}>{item.price}</div>
          </div>
        )}
        {error.payment ? <div className="uk-alert-danger" uk-alert="">
          <p>Prosim vyberte spusob platby</p>
        </div> : ''}

      </div>
    </div>
  )
}

export default ShipPay
