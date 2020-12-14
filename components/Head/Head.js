// import {useContext} from 'react'
// import {modal, util} from 'uikit'
// import { DataStateContext } from '../../context/dataStateContext'
// import translate from '../../data/staticTranslate'
// import { useRouter } from 'next/router'
const Head = ({head, lang}) => {

  // const router = useRouter()
  // const { dataContextState } = useContext(DataStateContext)

  // const toggleModal = () => {
  //   modal('#modal-login').show();
  // }

  return (
    <div className="tm-basket-head">
      <h1>{head}</h1>
      {/*{router.asPath === '/basket/checkout' && !dataContextState?.user?.email && <a href="#modal-login" className="tm-button tm-bare-button" onClick={() => toggleModal()}>{translate.login2[lang]}</a>}*/}
    </div>
  )
}

export default Head
