import Link from 'next/link'
import translate from '../../data/staticTranslate'
import localize from '../../data/localize'
import { useRouter } from 'next/router'

const ButtonsSubmit = ({sendOrder}) => {
  const router = useRouter()
  const {lang} = localize(router.locale)

  return(
    <>
      {router.pathname === '/basket' && <Link href="/basket/checkout" className="tm-button tm-black-button">{translate.checkout[lang]}</Link>}
      {router.pathname === '/basket/checkout' && <button className="tm-button tm-black-button" onClick={() => sendOrder()}>{translate.sendorder[lang]}</button>}
    </>
  )
}

export default ButtonsSubmit
