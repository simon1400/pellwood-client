import {useState, useEffect, useContext} from 'react';
import Page from '../../layout/Page'
import { DataStateContext } from '../../context/dataStateContext'
import translate from '../../data/staticTranslate'
import { useRouter } from 'next/router'
import Head from '../../components/Head'
import Body from '../../components/Body'
import Total from '../../components/Total'
import ButtonsSubmit from '../../components/ButtonsSubmit'
import sumTotal from '../../functions/sumTotal'
import localize from '../../data/localize'

const Basket = () => {

  const router = useRouter()
  const {lang} = localize(router.locale)
  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)
  const [sum, setSum] = useState(0)
  const [sumBefore, setSumBefore] = useState(0)
  const [sale, setSale] = useState(0)
  const [basket, setBasket] = useState(dataContextState.basket)

  useEffect(() => {
    if(!basket?.length){
      window.location.href = '/'
    }
  }, [basket])

  useEffect(() => {
    sumTotal(0, 0, basket, setSumBefore, setSale, setSum, lang)
  }, [])

  useEffect(() => {
    sumTotal(0, 0, basket, setSumBefore, setSale, setSum, lang)
  }, [sum])


  return (
    <Page className="basket" title={translate.basket[lang]}>
      <div className="tm-basket-content-wrap">
        <div className="tm-basket-content">
          <Head />
          <Body
            setSum={setSum}
            sum={sum}
            basket={basket}
            setBasket={setBasket} />
        </div>
      </div>
      <div className="basket-right-panel">
        <div className="basket-right-content">
          <Total sum={sumBefore} sale={sale} />
          <div>
            <p>{translate.infovat[lang]}</p>
          </div>
          <div className="tm-basket-footer tm-footer-single total-end-footer">
            <ButtonsSubmit />
          </div>
        </div>
      </div>
    </Page>
  )
}
export default Basket
