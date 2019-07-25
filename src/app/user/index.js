import React, {useState} from 'react'
import Delivery from './components/delivery.js'
import Corporate from './components/corporate.js'
import Head from './components/head'
import AnimateHeight from 'react-animate-height';
import './style.scss'
import axios from 'axios'

const User = () => {

  const [user] = useState(JSON.parse(localStorage.getItem('user')))

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
    await axios.post('/.netlify/functions/update', saveData).then(res => {
      localStorage.setItem('user', JSON.stringify(res.data.data))
    }).catch(err => {
      console.log(err);
    })
  }

  return(
    <main className="basket user">
      <div className="tm-basket-content">
        <Head head="Váš ucet" />
        <Delivery state={state[0]} setState={state[1]}/>

        <div className="uk-margin-small checkbox_item">
          <input type="checkbox" id="checkbox_another_address" onChange={() => handleChange('anotherAddressCheck', !state[0].anotherAddressCheck)} checked={state[0].anotherAddressCheck} />
          <label htmlFor="checkbox_another_address"></label>
          <label htmlFor="checkbox_another_address">Doručit na jinou adresu</label>
        </div>

        <AnimateHeight duration={ 500 } height={ state[0].anotherAddressCheck ? 'auto' : 0 } >
          <Delivery state={anotherAdress[0]} setState={anotherAdress[1]}/>
        </AnimateHeight>

        <div className="uk-margin-small checkbox_item">
          <input type="checkbox" id="checkbox_firm_data" onChange={() => handleChange('companyDataCheck', !state[0].companyDataCheck)} checked={state[0].companyDataCheck} />
          <label htmlFor="checkbox_firm_data"></label>
          <label htmlFor="checkbox_firm_data">Doplnit firemní údaje</label>
        </div>

        <AnimateHeight duration={ 500 } height={ state[0].companyDataCheck ? 'auto' : 0 } >
          <Corporate state={companyData[0]} setState={companyData[1]} />
        </AnimateHeight>

        <hr />

        <div className="form_container">
          <div className="form_column"></div>
          <div className="form_column"><button className="tm-button tm-black-button" onClick={e => onSave()}>ULOŽIT</button></div>
        </div>


      </div>
      <div className="basket-right-panel">
        <div className="last_order_wrap tm-total-end">
        <table className="uk-table uk-table-small uk-table-divider">
          <thead>
            <tr>
              <th colSpan="2">Historie objednávek</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Objednávka č. 123456</td>
              <td className="uk-text-right">596 Kč</td>
            </tr>
            <tr>
              <td>Objednávka č. 123456</td>
              <td className="uk-text-right">596 Kč</td>
            </tr>
          </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}


export default User
