import React, {useState, useEffect} from 'react'
import Delivery from './components/delivery.js'
import Head from './components/head'

const User = () => {

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

  return(
    <main className="basket user">
      <div className="tm-basket-content">
        <Head head="Váš ucet" />
        <Delivery state={state[0]} setState={state[1]}/>
      </div>
      <div className="basket-right-panel">
      </div>
    </main>
  )
}


export default User
