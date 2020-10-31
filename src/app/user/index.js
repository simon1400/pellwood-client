import React, {useState, useEffect} from 'react'
import Delivery from './components/delivery.js'
import Corporate from './components/corporate.js'
import Head from './components/head'
import AnimateHeight from 'react-animate-height';
import './style.scss'
import axios from 'axios'
import translate from '../data/staticTranslate'

import localize from '../data/localize'
const {lang, currency} = localize(window.location.href)

const User = () => {

  const [user] = useState(JSON.parse(localStorage.getItem('user')))
  const [orders, setOrders] = useState([])

  const state = useState({
    email: user.email,
    phone: user.phone,
    name: user.name,
    surname: user.surname,
    country: user.country,
    city: user.city,
    address: user.address,
    code: user.code,
    anotherAddressCheck: false,
    companyDataCheck: false
  })

  const anotherAdress = useState({...user.anotherAdress})

  const companyData = useState({...user.companyData})


  useEffect(() => {
    axios.post('/api/getOrder', {email: state[0].email}).then(res => {
      setOrders(res.data.data)
    })

  }, [])

  const handleChange = (name, value) => {
    let newState = state[0];
    newState[name] = value;
    state[1]({...newState})
  }

  const onSave = async e => {
    let saveData = {
      id: user._id,
      ...state[0],
      anotherAdress: anotherAdress[0],
      companyData: companyData[0]
    }
    await axios.post('/api/update', {data: saveData, type: 'update'}).then(res => {
      localStorage.setItem('user', JSON.stringify(res.data.data))
    }).catch(err => {
      console.log(err);
    })
  }

  const onLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return(
    <main className="basket user">
      <div className="tm-basket-content-wrap">
        <div className="tm-basket-content">
          <Head head="Váš ucet" />
          <Delivery state={state[0]} setState={state[1]}/>

          <div className="uk-margin-small checkbox_item">
            <input type="checkbox" id="checkbox_another_address" onChange={() => handleChange('anotherAddressCheck', !state[0].anotherAddressCheck)} checked={state[0].anotherAddressCheck} />
            <label htmlFor="checkbox_another_address"></label>
            <label htmlFor="checkbox_another_address">{translate.checkdifferentadress[lang]}</label>
          </div>

          <AnimateHeight duration={ 500 } height={ state[0].anotherAddressCheck ? 'auto' : 0 } >
            <Delivery state={anotherAdress[0]} setState={anotherAdress[1]}/>
          </AnimateHeight>

          <div className="uk-margin-small checkbox_item">
            <input type="checkbox" id="checkbox_firm_data" onChange={() => handleChange('companyDataCheck', !state[0].companyDataCheck)} checked={state[0].companyDataCheck} />
            <label htmlFor="checkbox_firm_data"></label>
            <label htmlFor="checkbox_firm_data">{translate.checkcompanydata[lang]}</label>
          </div>

          <AnimateHeight duration={ 500 } height={ state[0].companyDataCheck ? 'auto' : 0 } >
            <Corporate state={companyData[0]} setState={companyData[1]} />
          </AnimateHeight>

          <hr />

          <div className="form_container">
            <div className="form_column"><button className="tm-button tm-bare-button" onClick={() => onLogout()}>Odhlásit se</button></div>
            <div className="form_column uk-text-right"><button className="tm-button tm-black-button" onClick={e => onSave()}>ULOŽIT</button></div>
          </div>

        </div>
      </div>
      <div className="basket-right-panel">
        <div className="basket-right-content">
          <div className="last_order_wrap tm-total-end">
          <table className="uk-table uk-table-small uk-table-divider">
            <thead>
              <tr>
                <th colSpan="2">Historie objednávek</th>
              </tr>
            </thead>
            <tbody>
              {orders.length ? orders.map(item =>
                <tr key={item._id}>
                  <td>Objednávka č. {item.idOrder}</td>
                  <td className="uk-text-right">{item.sum} {' ' + currency}</td>
                </tr>)
              : <tr>
                  <td>Nemate zadnu objednavku</td>
                  <td className="uk-text-right"></td>
                </tr>
              }
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}


export default User
