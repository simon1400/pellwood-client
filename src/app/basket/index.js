import React, {useState, useEffect, useContext} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import { withRouter } from "react-router";
import axios from 'axios'
import './style.scss'
import { DataStateContext } from '../context/dataStateContext'
import translate from '../data/staticTranslate'

import NotFound from '../pages/not-found';
import Head from './components/head'
import Body from './components/body'
import Checkout from './components/checkout'
import Total from './components/total'
import TotalEnd from './components/total-end'

import validationForm from '../function/validationForm'

import localize from '../data/localize'
const {lang, currency} = localize(window.location.href)

const Basket = () => {

  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)
  const [sum, setSum] = useState(0)
  const [basket, setBasket] = useState(dataContextState.basket)
  const [user, setUser] = useState(dataContextState.user)

  const state = useState({
    email: user?.email || '',
    phone: user?.phone || '',
    name: user?.name || '',
    surname: user?.surname || '',
    country: 'cz',
    city: user?.city || '',
    address: user?.address || '',
    code: user?.code || '',
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
    country: 'cz',
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
    email: false,
    phone: false,
    name: false,
    surname: false,
    city: false,
    address: false,
    code: false,
    delivery: false,
    payment: false
  })
  const [errorAnother, setErrorAnother] = useState({
    email: false,
    phone: false,
    name: false,
    surname: false,
    city: false,
    address: false,
    code: false
  })

  useEffect(() => {
    if(!basket?.length){
      window.location.href = '/'
    }
  }, [basket])

  useEffect(() => {
    setUser(dataContextState.user)
    state[1]({...state[0], ...dataContextState.user})
  }, [dataContextState.user])

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
      if(item.variantPrice instanceof String){
        sumItem = +item.variantPrice * item.countVariant
      }else{
        sumItem = item.variantPrice.replace(/,/g, '.') * item.countVariant
      }
      sumAll = +sumItem + sumAll
    })

    if(delivery || payment){
      if(delivery !== 'ZDARMA' && delivery !== 'FREE') sumAll = +sumAll + +delivery.split(' ')[0]
      if(payment !== 'ZDARMA' && payment !== 'FREE') sumAll = +sumAll + +payment.split(' ')[0]
    }
    if(lang === 'en'){
      setSum((Math.round(sumAll * 100) / 100).toFixed(2).replace(/\./g, ','))
    }else{
      setSum(sumAll)
    }

  }

  const onBlur = (type) => {
    if(validationForm(type, state[0], error, setError)){
      return true
    }
    return false
  }


  const sendOrder = async () => {

    if(!state[0].address.length) {setError({...error, address: true}); return;}
    else if(!state[0].city.length) {setError({...error, city: true}); return;}
    else if(!state[0].surname.length) {setError({...error, surname: true}); return;}
    else if(!state[0].name.length) {setError({...error, name: true}); return;}
    else if(!state[0].phone.length) {setError({...error, phone: true}); return;}
    else if(!state[0].code.length) {setError({...error, code: true}); return;}

    if(onBlur('email')) return

    if(!deliveryMethod[0].value.length){
      setError({ ...error, delivery: true })
      return
    }

    if(!paymentMethod[0].value.length){
      setError({ ...error, payment: true })
      return
    }


    if(!basket.length){
      window.location.href = '/'
      return
    }

    const dataOrder = {
      sum: sum.replace(/,/g, '.'),
      basket,
      status: 'PENDING',
      user: {
        ...state[0],
        anotherAdress: anotherAdress[0],
        companyData: companyData[0],
        password: password[0]
      },
      delivery: deliveryMethod[0],
      payment: paymentMethod[0],
      note: note[0],
      currency: currency
    }

    if(state[0].registrationCheck){
      axios.post('/api/update', {data: dataOrder.user, type: 'create'}).then(res =>
        dataContextDispatch({ state: res.data.data, type: 'user' })
      )
    }

    await axios.post('/api/createOrder', dataOrder).then(res => {
      dataContextDispatch({ state: [], type: 'basket' })
      dataContextDispatch({ state: 0, type: 'basketCount' })
      window.location.href = decodeURIComponent(res.data.data.redirect)
    })
  }


  return (
    <main className="basket">
      <div className="tm-basket-content-wrap">
        <div className="tm-basket-content">
          <Switch>
            <Route exact path="/basket" render={() => <Head head="Váš nákupní košík" user={user}/>} />
            <Route exact path="/basket/checkout" render={() => <Head head="Objednávka" user={user}/>} />
            <Route exact path="/en/basket" render={() => <Head head="Váš nákupní košík" user={user}/>} />
            <Route exact path="/en/basket/checkout" render={() => <Head head="Objednávka" user={user}/>} />
          </Switch>
          <Switch>
            <Route exact path="/basket" render={() => <Body
                setSum={setSum}
                sum={sum}
                basket={basket}
                setBasket={setBasket}
                currency={currency} />} />
            <Route exact path="/basket/checkout" render={() => <Checkout
                state={state}
                onBlur={onBlur}
                setError={setError}
                error={error}
                errorAnother={errorAnother}
                setErrorAnother={setErrorAnother}
                user={user}
                anotherAdress={anotherAdress}
                companyData={companyData}
                password={password}
                note={note}
                deliveryMethod={deliveryMethod}
                paymentMethod={paymentMethod} />} />
            <Route exact path="/en/basket" render={() => <Body
                setSum={setSum}
                sum={sum}
                basket={basket}
                setBasket={setBasket}
                currency={currency} />} />
            <Route exact path="/en/basket/checkout" render={() => <Checkout
                state={state}
                onBlur={onBlur}
                error={error}
                setError={setError}
                user={user}
                errorAnother={errorAnother}
                setErrorAnother={setErrorAnother}
                anotherAdress={anotherAdress}
                companyData={companyData}
                password={password}
                note={note}
                deliveryMethod={deliveryMethod}
                paymentMethod={paymentMethod} />} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
      <div className="basket-right-panel">
        <div className="basket-right-content">
          <Switch>
            <Route exact path="/basket" render={() => <Total sum={sum} currency={currency} />} />
            <Route exact path="/basket/checkout" render={() => <TotalEnd error sum={sum} basket={basket} delivery={deliveryMethod[0].price} payment={paymentMethod[0].price} currency={currency} />} />
            <Route exact path="/en/basket" render={() => <Total sum={sum} currency={currency} />} />
            <Route exact path="/en/basket/checkout" render={() => <TotalEnd sum={sum} basket={basket} delivery={deliveryMethod[0].price} payment={paymentMethod[0].price} currency={currency} />} />
          </Switch>
          <div>
            <p>{translate.infovat[lang]}</p>
            <Route exact path="/basket/checkout" render={() => <p>Odesláním objednávky souhlasíte s <a href="/">obchodními podmínkami</a>.</p>} />
            <Route exact path="/en/basket/checkout" render={() => <p>Odesláním objednávky souhlasíte s <a href="/">obchodními podmínkami</a>.</p>} />
          </div>
          <div>
            <div className="tm-basket-footer tm-footer-single">
              <Switch>
                <Route exact path="/basket" render={() => <Link to="/basket/checkout" className="tm-button tm-black-button">{translate.checkout[lang]}</Link>} />
                <Route exact path="/basket/checkout" render={() => <button className="tm-button tm-black-button" onClick={() => sendOrder()}>Objednat</button>} />
                <Route exact path="/en/basket" render={() => <Link to="/basket/checkout" className="tm-button tm-black-button">{translate.checkout[lang]}</Link>} />
                <Route exact path="/en/basket/checkout" render={() => <button className="tm-button tm-black-button" onClick={() => sendOrder()}>Objednat</button>} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
export default withRouter(Basket)
