import React from 'react'
import {Route} from 'react-router-dom'
import Checkout from './Checkout'

import localize from '../../../data/localize'
const {lang} = localize(window.location.href)

const routes = ['/basket/checkout', `/${lang}/basket/checkout`]

const CheckoutWrap = ({
  state,
  error,
  sumBefore,
  setError,
  user,
  anotherAdress,
  companyData,
  password,
  note,
  deliveryMethod,
  errorAnother,
  setErrorAnother,
  paymentMethod,
  onBlur
}) => {

  const handleChange = (name, value) => {
    let newState = state[0];
    setError({...error, [name]: false})
    newState[name] = value;
    state[1]({...newState})
  }


  return <>
    {routes.map((item, index) => <Route key={index} exact path={item} render={() => <Checkout
        handleChange={handleChange}
        state={state}
        error={error}
        sumBefore={sumBefore}
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
        onBlur={onBlur}
      />}
    />)}
  </>
}


export default CheckoutWrap
