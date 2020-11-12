import React, {useState, useEffect, useContext} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import { withRouter } from "react-router";
import {AxiosAPI} from '../restClient'
import './style.scss'
import {scroll} from 'uikit'
import { DataStateContext } from '../context/dataStateContext'
import translate from '../data/staticTranslate'

import NotFound from '../pages/not-found';
import Head from './components/head'
import Body from './components/body'
import Checkout from './components/checkout'
import Total from './components/total'
import TotalEnd from './components/total-end'
import validationForm from '../function/validationForm'
import AcceptInfo from './components/acceptInfo'
import ButtonsSubmit from './components/ButtonsSubmit'

import localize from '../data/localize'
const {lang, currency} = localize(window.location.href)

const Basket = () => {

  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)
  const [sum, setSum] = useState(0)
  const [sumBefore, setSumBefore] = useState(0)
  const [sale, setSale] = useState(0)
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

      if(item.variantPrice instanceof String)sumItem = +item.variantPrice * item.countVariant
      else sumItem = item.variantPrice * item.countVariant

      sumAll = +sumItem + sumAll
    })

    let sumItemsBefore = sumAll
    setSumBefore(sumItemsBefore)

    if(lang === 'en' && sumAll > 150) setSale((Math.round(sumAll * 0.05 * 100) / 100).toFixed(2))
    else if(lang === 'cz' && sumAll > 2000) setSale(Math.round(sumAll * 0.05))

    if(lang === 'cz' && sumAll > 2000 || lang === 'en' && sumAll > 150){
      setSumBefore(Math.round(sumAll - (sumAll * 0.05)))
      sumAll = sumAll - (sumAll * 0.05)
    }

    if(lang === 'en' && sumAll <= 150 || lang === 'cz' && sumAll <= 2000) setSale(0)

    if(delivery || payment){
      if(delivery !== translate.free[lang] && ((lang === 'en' && sumAll <= 100) || (lang === 'cz' && sumAll <= 1500))) sumAll = +sumAll + +delivery.split(' ')[0]
      if(payment !== translate.free[lang]) sumAll = +sumAll + +payment.split(' ')[0]
    }

    if(lang === 'en') setSum((Math.round(sumAll * 100) / 100).toFixed(2))
    else setSum(Math.round(sumAll))
  }

  const onBlur = (type) => {
    if(validationForm(type, state[0], error, setError)) {
      scroll('html').scrollTo('header');
      return true
    }
    return false
  }


  const sendOrder = async () => {

    if(!state[0].address.length || !state[0].city.length || !state[0].surname.length || !state[0].name.length || !state[0].phone.length || !state[0].code.length){
      scroll('html').scrollTo('header');
    }

    if(!state[0].address.length) {setError({...error, address: true}); return;}
    else if(!state[0].city.length) {setError({...error, city: true}); return;}
    else if(!state[0].surname.length) {setError({...error, surname: true}); return;}
    else if(!state[0].name.length) {setError({...error, name: true}); return;}
    else if(!state[0].phone.length) {setError({...error, phone: true}); return;}
    else if(!state[0].code.length) {setError({...error, code: true}); return;}

    if(onBlur('email')) return

    if(!deliveryMethod[0].value.length){ setError({ ...error, delivery: true }); return;}
    if(!paymentMethod[0].value.length){ setError({ ...error, payment: true }); return;}

    if(!basket.length){
      window.location.href = '/'
      return
    }

    const dataOrder = {
      basket,
      sum,
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
      AxiosAPI.post(`${process.env.REACT_APP_API}/user`, {data: dataOrder.user, type: 'create'}).then(res =>
        dataContextDispatch({ state: res.data.data, type: 'user' })
      )
    }

    await AxiosAPI.post(`${process.env.REACT_APP_API}/order`, dataOrder).then(res => {
      if(dataOrder.payment.payOnline){
        window.location.href = decodeURIComponent(res.data.data.redirect)
      }else{
        window.location.href = `/thank-you?refId=${res.data.data.idOrder}&dobirka=true`
      }
    })

  }


  return (
    <main className="basket">
      <div className="tm-basket-content-wrap">
        <div className="tm-basket-content">
          <Head />
          <Body
            setSum={setSum}
            sum={sum}
            basket={basket}
            setBasket={setBasket} />
          <Checkout
            state={state}
            error={error}
            setError={setError}
            user={user}
            anotherAdress={anotherAdress}
            companyData={companyData}
            password={password}
            note={note}
            deliveryMethod={deliveryMethod}
            errorAnother={errorAnother}
            setErrorAnother={setErrorAnother}
            paymentMethod={paymentMethod}
            sumBefore={sumBefore}
            onBlur={onBlur} />
        </div>
      </div>
      <div className="basket-right-panel">
        <div className="basket-right-content">
          <Total sum={sumBefore} sale={sale} />
          <TotalEnd
            sum={sum}
            basket={basket}
            sale={sale}
            sumBefore={sumBefore}
            delivery={deliveryMethod[0].price}
            payment={paymentMethod[0].price} />
          <div>
            <p>{translate.infovat[lang]}</p>
            <AcceptInfo />
          </div>
          <div className="tm-basket-footer tm-footer-single">
            <ButtonsSubmit sendOrder={sendOrder} />
          </div>
        </div>
      </div>
    </main>
  )
}
export default withRouter(Basket)
