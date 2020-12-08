import React, {useState, useEffect, useContext} from 'react'
import './style.scss'
import { DataStateContext } from '../../context/dataStateContext'
import translate from '../../data/staticTranslate'
import getUrl from '../../function/getSearch'
import gtag from '../../function/gtag'
import {AxiosAPI} from '../../restClient'

const ThankYou = () => {

  const [status, setStatus] = useState('')
  const [lang, setLang] = useState('')
  const { dataContextDispatch } = useContext(DataStateContext)

  useEffect(() => {

    var serchUrl = getUrl(window.location.search);
    if(!serchUrl.refId){ window.location.href = '/not-found'; return;}

    dataContextDispatch({ state: [], type: 'basket' })
    dataContextDispatch({ state: 0, type: 'basketCount' })

    AxiosAPI.get(`${process.env.REACT_APP_API}/payment/status/${serchUrl.refId}`).then(res => {
      const order = res.data.data[0]

      AxiosAPI.post(`${process.env.REACT_APP_API}/send/orderInfo`, res.data.data[0])
      .then(resMail => console.log(resMail.data))
      .catch(err => console.log('Send Email error --- ', err))

      if(order.payOnline) {
        setStatus(order.status)
        if(order.status !== 'PENDING' && order.status !== 'CANCELLED'){
          gtag(order)
        }
      }else{
        setStatus('dobirka')
        gtag(order)
      }

      setLang(res.data.data[0].currency === 'Kč' ? 'cz' : 'en')

    }).catch(err => console.log('Error get status order --- ', err))

  }, [])

  return(
    <div className="thank-you-page base-page">
      <h1>{translate.thankOrder[lang]}</h1>
      <p>{translate.thankInfo[lang]}</p>
      {!!status.length && status === 'PENDING' && <div className="uk-text-warning">{translate.PayStatusWait[lang]}</div>}
      {!!status.length && status === 'CANCELLED' && <div className="uk-text-danger">{translate.PayStatusError[lang]}</div>}
      {!!status.length && status === 'PAID' && <div className="uk-text-success">{translate.PayStatusOk[lang]}</div>}
      {!!status.length && status === 'dobirka' && <div className="uk-text-success">{translate.PayStatusCash[lang]}</div>}

      <a href="/" className="tm-button tm-black-button">{translate.backtohp[lang]}</a>
    </div>
  )
}

export default ThankYou
