import React, {useState, useEffect} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import { withRouter } from "react-router";
import './style.scss'

import NotFound from '../pages/not-found';
import Head from './components/head'
import Body from './components/body'
import Checkout from './components/checkout'
import Total from './components/total'
import TotalEnd from './components/total-end'


const Basket = () => {

  const [sum, setSum] = useState(0)
  const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket')))

  const state = useState({
    email: '',
    phone: '',
    name: '',
    surname: '',
    country: '',
    city: '',
    address: '',
    code: '',
    anotherAddressCheck: false,
    companyDataCheck: false,
    registrationCheck: false,
    noteCheck: false
  })

  const anotherAdress = useState({
    email: '',
    phone: '',
    name: '',
    surname: '',
    country: '',
    city: '',
    address: '',
    code: ''
  })

  const companyData = useState({
    companyName: '',
    ico: '',
    dic: '',
  })

  const password = useState('')
  const note = useState('')


  const deliveryMethod = useState({
    value: '',
    price: ''
  })
  const paymentMethod = useState({
    value: '',
    price: ''
  })

  useEffect(() => {
    sumTotal(0, 0)
  }, [])

  useEffect(() => {
    sumTotal(deliveryMethod[0].price, paymentMethod[0].price)
  }, [deliveryMethod, paymentMethod])

  const sumTotal = (delivery, payment) => {
    var sumAll = 0, sumItem = 0;
    var newBasket = basket
    newBasket.map((item, index) => {
      sumItem = +item.variantPrice.split(' ')[0] * item.countVariant
      sumAll = +sumItem + sumAll
    })

    if(delivery || payment){
      if(delivery !== 'ZDARMA') sumAll = +sumAll + +delivery.split(' ')[0]
      if(payment !== 'ZDARMA') sumAll = +sumAll + +payment.split(' ')[0]
    }

    setSum(sumAll)
  }

  return (
    <main className="basket">
      <div className="tm-basket-content">
        <Switch>
          <Route exact path="/basket" render={() => <Head head="Váš nákupní košík"/>} />
          <Route exact path="/basket/checkout" render={() => <Head head="Objednávka"/>} />
        </Switch>
        <Switch>
          <Route exact path="/basket" render={() => <Body setSum={setSum} sum={sum} basket={basket} setBasket={setBasket} />} />
          <Route exact path="/basket/checkout" render={() => <Checkout state={state} anotherAdress={anotherAdress} companyData={companyData} password={password} note={note} deliveryMethod={deliveryMethod} paymentMethod={paymentMethod} />} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <div className="basket-right-panel">
        <Switch>
          <Route exact path="/basket" render={() => <Total sum={sum} />} />
          <Route exact path="/basket/checkout" render={() => <TotalEnd sum={sum} basket={basket} delivery={deliveryMethod[0].price} payment={paymentMethod[0].price} />} />
        </Switch>
        <div>
          <p>Všechny ceny jsou včetně DPH 21 %</p>
          <Route exact path="/basket/checkout" render={() => <p>Odesláním objednávky souhlasíte s <a href="">obchodními podmínkami</a>.</p>} />
        </div>
        <div>
          <div className="tm-basket-footer tm-footer-single">
            <Link to="/basket/checkout" className="tm-button tm-black-button">přejít k objednávce</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
export default withRouter(Basket)
