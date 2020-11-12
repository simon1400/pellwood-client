import React, {useState, useEffect, useContext} from 'react'
import './style.scss'
import { DataStateContext } from '../../context/dataStateContext'
import translate from '../../data/staticTranslate'
import getUrl from '../../function/getSearch'
import localize from '../../data/localize'
import {AxiosAPI} from '../../restClient'
const {lang, currency} = localize(window.location.href)

const ThankYou = () => {

  const [status, setStatus] = useState('')
  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)

  useEffect(() => {
    var serchUrl = getUrl(window.location.search);
    if(!serchUrl.refId || !serchUrl.dobirka){
      window.location.href = '/not-found'
      return
    }
    dataContextDispatch({ state: [], type: 'basket' })
    dataContextDispatch({ state: 0, type: 'basketCount' })
    AxiosAPI.get(`${process.env.REACT_APP_API}/payment/status/${serchUrl.refId}`).then(res => {
      AxiosAPI.post(`${process.env.REACT_APP_API}/send/orderInfo`, res.data.data[0]).then(resMail => {
        console.log(resMail.data);
      }).catch(err => {
        console.log('Send Email error --- ', err);
      })
      if(res.data.data[0].payOnline){
        setStatus(res.data.data[0].status)
      }else{
        setStatus('dobirka')
      }

    }).catch(err => {
      console.log('Error get status order --- ', err)
    })

  }, [])

  return(
    <div className="thank-you-page base-page">
      <h1>Děkujeme za Vaši objednávku</h1>
      <p>Na Vámi uvedený e-mail Vám bylo zasláno potvrzení o provedené objednávce.</p>
      {!!status.length && status === 'PENDING' && <div className="uk-text-warning">Platba nebyla vyrizena</div>}
      {!!status.length && status === 'CANCELLED' && <div className="uk-text-danger">Platba byla zrusena</div>}
      {!!status.length && status === 'PAID' && <div className="uk-text-success">Platba zaplacena</div>}
      {!!status.length && status === 'dobirka' && <div className="uk-text-success">Platba na dobirku</div>}

      <a href="/" className="tm-button tm-black-button">zpět na hlavní stranu</a>
    </div>
  )
}

export default ThankYou
