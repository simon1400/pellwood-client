import React, {useState, useEffect} from 'react'
import './style.scss'
import translate from '../../data/staticTranslate'
import getUrl from '../../function/getSearch'
import localize from '../../data/localize'
import axios from 'axios'
const {lang, currency} = localize(window.location.href)

const ThankYou = () => {

  useEffect(() => {
    // var serchUrl = getUrl(window.location.search);
    // axios.post('/api/getStatusPayment', {id: serchUrl.id}).then(res => {
    //   console.log(res.data.data);
    // })
  }, [])

  return(
    <div className="thank-you-page base-page">
      <h1>Děkujeme za Vaši objednávku</h1>
      <p>Na Vámi uvedený e-mail Vám bylo zasláno potvrzení o provedené objednávce.</p>
      <span className="success">{translate.payment[lang]} zaplacena</span>
      <a href="/" className="tm-button tm-black-button">zpět na hlavní stranu</a>
    </div>
  )
}

export default ThankYou
