import React, {useState, useEffect} from 'react'
import './style.scss'
import translate from '../../data/staticTranslate'
import getUrl from '../../function/getSearch'
import localize from '../../data/localize'
import axios from 'axios'
const {lang, currency} = localize(window.location.href)

const ThankYou = () => {

  const [status, setStatus] = useState('')

  useEffect(() => {
    var serchUrl = getUrl(window.location.search);
    axios.post('/api/getStatusPayment', {id: serchUrl.refId}).then(res => {
      console.log(res.data.data);
      setStatus(res.data.data[0].status)
    })
  }, [])

  return(
    <div className="thank-you-page base-page">
      <h1>Děkujeme za Vaši objednávku</h1>
      <p>Na Vámi uvedený e-mail Vám bylo zasláno potvrzení o provedené objednávce.</p>
      {status.length && status === 'PENDING' && <span className="uk-text-warning">Platba nebyla vyrizena</span>}
      {status.length && status === 'CANCELLED' && <span className="uk-text-danger">Platba byla zrusena</span>}
      {status.length && status === 'PAID' && <span className="uk-text-success">Platba zaplacena</span>}

      <a href="/" className="tm-button tm-black-button">zpět na hlavní stranu</a>
    </div>
  )
}

export default ThankYou
