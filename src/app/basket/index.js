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
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || {})

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
    if(Object.keys(user).length){
      state[1]({
        email: user.email,
        phone: user.phone,
        name: user.name,
        surname: user.surname,
        country: user.country,
        city: user.city,
        address: user.address,
        code: user.code,
      })
      anotherAdress[1]({...user.anotherAdress})
      companyData[1]({...user.companyData})
    }
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


  const sendOrder = () => {
    console.log(basket);
    console.log(user);
  }


  return (
    <main className="basket">
      <div className="tm-basket-content">
        <Switch>
          <Route exact path="/basket" render={() => <Head head="Váš nákupní košík" user={user}/>} />
          <Route exact path="/basket/checkout" render={() => <Head head="Objednávka" user={user}/>} />
        </Switch>
        <Switch>
          <Route exact path="/basket" render={() => <Body setSum={setSum} sum={sum} basket={basket} setBasket={setBasket} />} />
          <Route exact path="/basket/checkout" render={() => <Checkout state={state} user={user} anotherAdress={anotherAdress} companyData={companyData} password={password} note={note} deliveryMethod={deliveryMethod} paymentMethod={paymentMethod} />} />
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
            <Switch>
              <Route exact path="/basket" render={() => <Link to="/basket/checkout" className="tm-button tm-black-button">přejít k objednávce</Link>} />
              <Route exact path="/basket/checkout" render={() => <button className="tm-button tm-black-button" onClick={() => sendOrder()}>Objednat</button>} />
            </Switch>

          </div>
        </div>
      </div>
    </main>
  )
}
export default withRouter(Basket)
