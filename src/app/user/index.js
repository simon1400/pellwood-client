import React, {useState, useEffect, useContext} from 'react'
import Delivery from './components/delivery.js'
import Corporate from './components/corporate.js'
import Head from './components/head'
import AnimateHeight from 'react-animate-height';
import './style.scss'
import { DataStateContext } from '../context/dataStateContext'
import axios from 'axios'
import translate from '../data/staticTranslate'
import validationForm from '../function/validationForm'
import localize from '../data/localize'
const {lang, currency} = localize(window.location.href)

const User = () => {
  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)
  const [user] = useState(dataContextState.user)
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

  const [error, setError] = useState({
    email: false,
    phone: false,
    name: false,
    surname: false,
    city: false,
    address: false,
    code: false
  })

  const anotherAdress = useState({...user.anotherAdress})

  const companyData = useState({...user.companyData})


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API}/order/${state[0].email}`).then(res => {
      setOrders(res.data.data)
    })
  }, [])

  const handleChange = (name, value) => {
    let newState = state[0];
    newState[name] = value;
    state[1]({...newState})
  }

  const onSave = async e => {

    if(!state[0].address.length) {setError({...error, address: true}); return;}
    else if(!state[0].city.length) {setError({...error, city: true}); return;}
    else if(!state[0].surname.length) {setError({...error, surname: true}); return;}
    else if(!state[0].name.length) {setError({...error, name: true}); return;}
    else if(!state[0].phone.length) {setError({...error, phone: true}); return;}
    else if(!state[0].code.length) {setError({...error, code: true}); return;}

    if(onBlur('email')) return;

    let saveData = {
      id: user._id,
      ...state[0],
      anotherAdress: anotherAdress[0],
      companyData: companyData[0]
    }
    await axios.put(`${process.env.REACT_APP_API}/user`, {data: saveData, type: 'update'}).then(res => {
      dataContextDispatch({ state: res.data.data, type: 'user' })
    }).catch(err => {
      console.log(err);
    })
  }

  const onLogout = () => {
    dataContextDispatch({ state: null, type: 'user' })
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  const onBlur = (type) => {
    if(validationForm(type, state[0], error, setError)){
      return true
    }
    return false
  }

  return(
    <main className="basket user">
      <div className="tm-basket-content-wrap">
        <div className="tm-basket-content">
          <Head head={translate.yourAccount[lang]} />
          <Delivery state={state[0]} setState={state[1]} error={error} setError={setError} onBlur={onBlur}/>

          <div className="uk-margin-small checkbox_item">
            <input type="checkbox" id="checkbox_another_address" onChange={() => handleChange('anotherAddressCheck', !state[0].anotherAddressCheck)} checked={state[0].anotherAddressCheck} />
            <label htmlFor="checkbox_another_address"></label>
            <label htmlFor="checkbox_another_address">{translate.checkdifferentadress[lang]}</label>
          </div>

          <AnimateHeight duration={ 500 } height={ state[0].anotherAddressCheck ? 'auto' : 0 } >
            <Delivery state={anotherAdress[0]} setState={anotherAdress[1]} error={error} setError={setError} onBlur={onBlur}/>
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

          <div className="form_column">
            <div>
              <button className="tm-button tm-bare-button" onClick={() => onLogout()}>{translate.logOut[lang]}</button>
            </div>
            <div className="uk-text-right">
              <button className="tm-button tm-black-button" onClick={e => onSave()}>{translate.save[lang]}</button>
            </div>
          </div>

        </div>
      </div>
      <div className="basket-right-panel">
        <div className="basket-right-content">
          <div className="last_order_wrap tm-total-end">
          <table className="uk-table uk-table-small uk-table-divider">
            <thead>
              <tr>
                <th colSpan="2">{translate.orderHistory[lang]}</th>
              </tr>
            </thead>
            <tbody>
              {orders?.length ? orders.map(item =>
                <tr key={item._id}>
                  <td>{translate.orderNumber[lang]} {item.idOrder}</td>
                  <td className="uk-text-right">{item.sum} {' ' + currency}</td>
                </tr>)
              : <tr>
                  <td>{translate.noOrder[lang]}</td>
                  <td className="uk-text-right"></td>
                </tr>}
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}


export default User
