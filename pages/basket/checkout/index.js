import {useState, useEffect, useContext} from 'react';
import {AxiosAPI} from '../../../restClient'
import { DataStateContext } from '../../../context/dataStateContext'
import translate from '../../../data/staticTranslate'
import Page from '../../../layout/Page'
import { useRouter } from 'next/router'
import Head from '../../../components/Head'
import Checkout from '../../../components/Checkout'
import TotalEnd from '../../../components/TotalEnd'
import AcceptInfo from '../../../components/AcceptInfo'
import ButtonsSubmit from '../../../components/ButtonsSubmit'
import validationForm from '../../../functions/validationForm'
import sumTotal from '../../../functions/sumTotal'

import localize from '../../../data/localize'

const Basket = () => {

  const router = useRouter()
  const {lang, currency} = localize(router.locale)
  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)
  const [sum, setSum] = useState(0)
  const [sumBefore, setSumBefore] = useState(0)
  const [sale, setSale] = useState(0)
  const [basket] = useState(dataContextState['basket'])
  const [user, setUser] = useState(dataContextState.user)

  const state = useState({
    email: user?.email || '',
    phone: user?.phone || '',
    name: user?.name || '',
    surname: user?.surname || '',
    country: lang === 'cz' ? 'cz' : 'de',
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
    country: lang === 'cz' ? 'cz' : 'de',
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
    price: '',
    payOnline: false
  })
  const paymentMethod = useState({
    value: '',
    price: '',
    payOnline: false
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
    setUser(dataContextState.user)
    state[1]({...state[0], ...dataContextState.user})
  }, [dataContextState.user])

  useEffect(() => {
    sumTotal(0, 0, basket, setSumBefore, setSale, setSum, lang)
  }, [])

  useEffect(() => {
    sumTotal(deliveryMethod[0].price, paymentMethod[0].price, basket, setSumBefore, setSale, setSum, lang)
  }, [deliveryMethod, paymentMethod])

  const onBlur = (type) => {
    if(validationForm(type, state[0], error, setError)) {
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
      AxiosAPI.post(`/user`, {data: dataOrder.user, type: 'create'}).then(res =>
        dataContextDispatch({ state: res.data.data, type: 'user' })
      )
    }

    await AxiosAPI.post(`/order`, dataOrder).then(res => {
      if(dataOrder.payment.payOnline){
        window.location.href = decodeURIComponent(res.data.data.redirect)
      }else{
        window.location.href = `/thank-you?refId=${res.data.data.idOrder}&dobirka=true`
      }
    })

  }


  return (
    <Page className="basket" title={translate.order[lang]}>
      <div className="tm-basket-content-wrap">
        <div className="tm-basket-content">
          <Head />
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
          <div className="tm-basket-footer tm-footer-single total-end-footer">
            {Object.values(error).indexOf(true) >= 0 && <div className="uk-alert-danger uk-width-1-1 uk-text-center" uk-alert=""><p>{translate.errorSendOrder[lang]}</p></div>}
            <ButtonsSubmit sendOrder={sendOrder} />
          </div>
        </div>
      </div>
    </Page>
  )
}
export default Basket
