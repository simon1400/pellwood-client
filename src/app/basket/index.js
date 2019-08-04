import React, {useState, useEffect} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import { withRouter } from "react-router";
import axios from 'axios'
import './style.scss'

import NotFound from '../pages/not-found';
import Head from './components/head'
import Body from './components/body'
import Checkout from './components/checkout'
import Total from './components/total'
import TotalEnd from './components/total-end'

var lang = 'cz', currency = 'Kč'
if(window.location.pathname.split('/')[1] === 'en'){
  lang = 'en';
  currency = '$';
}else if(window.location.pathname.split('/')[1] === 'de'){
  lang = 'de';
  currency = '&euro;';
}else{
  lang = 'cz';
  currency = 'Kč';
}


const Basket = () => {

  const [sum, setSum] = useState(0)
  const [basket, setBasket] = useState(JSON.parse(localStorage.getItem('basket')))
  const [user] = useState(JSON.parse(localStorage.getItem('user')) || {})

  const state = useState({
    email: 'pechunka11@gmail.com',
    phone: '+420774048983',
    name: 'Dmytro',
    surname: 'Pechunka',
    country: '3',
    city: 'Brno',
    address: 'Serankova 11',
    code: '60200',
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

  const [error, setError] = useState({
    delivery: false,
    payment: false
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
      if(item.variantPrice instanceof String){
        sumItem = +item.variantPrice.split(' ')[0] * item.countVariant
      }else{
        sumItem = item.variantPrice * item.countVariant
      }
      sumAll = +sumItem + sumAll
    })

    if(delivery || payment){
      if(delivery !== 'ZDARMA') sumAll = +sumAll + +delivery.split(' ')[0]
      if(payment !== 'ZDARMA') sumAll = +sumAll + +payment.split(' ')[0]
    }

    setSum(sumAll)
  }


  const sendOrder = () => {

    if(!deliveryMethod[0].value.length){
      setError({ ...error, delivery: true })
      return
    }

    if(!paymentMethod[0].value.length){
      setError({ ...error, payment: true })
      return
    }




    const dataOrder = {
      sum,
      basket,
      status: 'new_payet',
      user: {
        ...state[0],
        anotherAdress: anotherAdress[0],
        companyData: companyData[0],
        password: password[0]
      },
      delivery: deliveryMethod[0],
      payment: paymentMethod[0],
      note: note[0]
    }

    if(state[0].registrationCheck){
      axios.post('/.netlify/functions/update', {data: dataOrder.user, type: 'create'}).then(res => localStorage.setItem('user', JSON.stringify(res.data.data)))
    }

    axios.post('/.netlify/functions/createOrder', dataOrder).then(res => {
      localStorage.removeItem('basket')
      localStorage.setItem('basketCount', 0)
      window.location.href = '/thank-you'
    })
  }


  return (
    <main className="basket">
      <div className="tm-basket-content-wrap">
        <div className="tm-basket-content">
          <Switch>
            <Route exact path="/basket" render={() => <Head head="Váš nákupní košík" user={user}/>} />
            <Route exact path="/basket/checkout" render={() => <Head head="Objednávka" user={user}/>} />
          </Switch>
          <Switch>
            <Route exact path="/basket" render={() => <Body setSum={setSum} sum={sum} basket={basket} setBasket={setBasket} currency={currency} />} />
            <Route exact path="/basket/checkout" render={() => <Checkout state={state} error={error} user={user} anotherAdress={anotherAdress} companyData={companyData} password={password} note={note} deliveryMethod={deliveryMethod} paymentMethod={paymentMethod} />} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
      <div className="basket-right-panel">
        <div className="basket-right-content">
          <Switch>
            <Route exact path="/basket" render={() => <Total sum={sum} currency={currency} />} />
            <Route exact path="/basket/checkout" render={() => <TotalEnd sum={sum} basket={basket} delivery={deliveryMethod[0].price} payment={paymentMethod[0].price} currency={currency} />} />
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
      </div>
    </main>
  )
}
export default withRouter(Basket)
