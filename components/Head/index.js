import {Switch, Route} from 'react-router-dom'
import translate from '../../data/staticTranslate'
import Head from './Head'
import localize from '../../data/localize'
import { useRouter } from 'next/router'

const HeadWrap = () => {
  const router = useRouter()
  const {lang} = localize(router.locale)

  return(
    <>
      {router.pathname === '/basket' && <Head head={translate.yourBasket[lang]} lang={lang}/>}
      {router.pathname === '/basket/checkout' && <Head head={translate.order[lang]} lang={lang}/>}
    </>
  )
}

export default HeadWrap
