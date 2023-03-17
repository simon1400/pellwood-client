import {useEffect, useContext} from 'react'
import { DataStateContext } from '../../context/dataStateContext'
import Page from '../../layout/Page'
import Head from 'next/head'
import Link from 'next/link'
import translate from '../../data/staticTranslate'
import gtag from '../../functions/gtag'
import {AxiosAPI} from '../../restClient'
import localize from '../../data/localize'

export async function getServerSideProps({query, locale}) {

  const {lang} = localize(locale)
  if (!query.refId) {
    return {
      redirect: {
        destination: '/not-found',
        permanent: false,
      },
    }
  }

  const res = await AxiosAPI.get(`/payment/status/${query.refId}`)

  const order = res.data.data[0]

  const resMail = await AxiosAPI.post(`/send/orderInfo`, order)

  var status = '', dataGtag;

  if(order.payOnline) {
    status = order.status
    if(status !== 'PENDING' && status !== 'CANCELLED'){
      dataGtag = gtag(order)
    }
  }else{
    status = 'dobirka'
    dataGtag = gtag(order)
  }

  return {
    props: {
      lang,
      status,
      dataGtag
    }
  }
}

const ThankYou = ({lang, status, dataGtag}) => {

  const { dataContextDispatch } = useContext(DataStateContext)

  useEffect(() => {
    dataContextDispatch({ state: [], type: 'basket'+lang })
    dataContextDispatch({ state: 0, type: 'basketCount'+lang })
  }, [status])

  return(
    <Page className="thank-you-page base-page" purchase={dataGtag}>
      <h1>{translate.thankOrder[lang]}</h1>
      <p>{translate.thankInfo[lang]}</p>
      {!!status.length && status === 'PENDING' && <div className="uk-text-warning">{translate.PayStatusWait[lang]}</div>}
      {!!status.length && status === 'CANCELLED' && <div className="uk-text-danger">{translate.PayStatusError[lang]}</div>}
      {!!status.length && status === 'PAID' && <div className="uk-text-success">{translate.PayStatusOk[lang]}</div>}
      {!!status.length && status === 'dobirka' && <div className="uk-text-success">{translate.PayStatusCash[lang]}</div>}

      <Link href="/"><a className="tm-button tm-black-button">{translate.backtohp[lang]}</a></Link>
    </Page>
  )
}

export default ThankYou
