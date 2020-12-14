import {useState, useEffect, useContext} from 'react'
import AnimateHeight from 'react-animate-height';
import Delivery from '../../components/User/delivery.js'
import Corporate from '../../components/User/corporate.js'
import { DataStateContext } from '../../context/dataStateContext'
import {AxiosAPI} from '../../restClient'
import Page from '../../layout/Page'
import translate from '../../data/staticTranslate'
import validationForm from '../../functions/validationForm'
import localize from '../../data/localize'
import { useRouter } from 'next/router'

const User = () => {

  const router = useRouter()
  const {lang, currency} = localize(router.local)
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
    AxiosAPI.get(`/order/${state[0].email}`).then(res => {
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
    await AxiosAPI.put(`/user`, {data: saveData, type: 'update'}).then(res => {
      dataContextDispatch({ state: res.data.data, type: 'user' })
    }).catch(err => {
      console.log(err);
    })
  }

  const onLogout = () => {
    dataContextDispatch({ state: null, type: 'user' })
    dataContextDispatch({ state: {}, type: 'user' })
    router.push('/')
  }

  const onBlur = (type) => {
    if(validationForm(type, state[0], error, setError)){
      return true
    }
    return false
  }

  return(
    <Page className="basket user">
      <div className="tm-basket-content-wrap">
        <div className="tm-basket-content">
          <div className="tm-basket-head">
            <h1>{translate.yourAccount[lang]}</h1>
          </div>
          <Delivery data={state[0]} setData={state[1]} error={error} setError={setError} onBlur={onBlur}/>

          <div className="uk-margin-small checkbox_item">
            <input type="checkbox" id="checkbox_firm_data" onChange={() => handleChange('companyDataCheck', !state[0].companyDataCheck)} checked={state[0].companyDataCheck} />
            <label htmlFor="checkbox_firm_data"></label>
            <label htmlFor="checkbox_firm_data">{translate.checkcompanydata[lang]}</label>
          </div>

          <AnimateHeight duration={ 500 } height={ state[0].companyDataCheck ? 'auto' : 0 } >
            <Corporate data={companyData[0]} setData={companyData[1]} />
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
    </Page>
  )
}


export default User
