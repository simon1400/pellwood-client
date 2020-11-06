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
      setStatus(res.data.data[0].status)
    })
  }, [])

  return(
    <div className="thank-you-page base-page">
      <h1>Děkujeme za Vaši objednávku</h1>
      <p>Na Vámi uvedený e-mail Vám bylo zasláno potvrzení o provedené objednávce.</p>
      {status.length && status === 'PENDING' && <div className="uk-text-warning">Platba nebyla vyrizena</div>}
      {status.length && status === 'CANCELLED' && <div className="uk-text-danger">Platba byla zrusena</div>}
      {status.length && status === 'PAID' && <div className="uk-text-success">Platba zaplacena</div>}

      <a href="/" className="tm-button tm-black-button">zpět na hlavní stranu</a>
    </div>
  )
}

export default ThankYou
