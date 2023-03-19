import {useState, useEffect, useContext} from 'react';
import Link from 'next/link'
import UIkit from 'uikit'
import translate from '../data/staticTranslate'
import { DataStateContext } from '../context/dataStateContext'
import localize from '../data/localize'
import { useRouter } from 'next/router'

const Canvas = () => {

  const router = useRouter()
  const {lang, currency} = localize(router.locale)

  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)
  const [basket, setBasket] = useState(dataContextState["basket"+lang])
  const [basketCount, setBasketCount] = useState(dataContextState["basketCount"+lang])
  const [sum, setSum] = useState(0)
  const [sale, setSale] = useState(0)

  useEffect(() => {
    setBasket(dataContextState["basket"+lang])
  }, [dataContextState["basketCount"+lang]])

  const closeCanvas = async (e, link) => {
    e.preventDefault()
    UIkit.offcanvas('#offcanvas-flip').hide();
    if(link.length){
      router.push(link)
    }
  }

  const onSumItems = () => {
    let sumAll = 0, sumItem = 0;

    if(basket){
      basket.map((item, index) => {
        if(item.variantPrice instanceof String){
          sumItem = item.variantPrice.split(' ')[0] * item.countVariant
        }else{
          sumItem = item.variantPrice * item.countVariant
        }

        sumAll = +sumItem + sumAll
      })
    }

    if(lang === 'en' && sumAll > 150){
      setSale((Math.round(sumAll * 0.05 * 100) / 100).toFixed(2))
      sumAll = sumAll - (sumAll * 0.05)
    }else if(lang === 'cz' && sumAll > 2000) {
      setSale(Math.round(sumAll * 0.05))
      sumAll = sumAll - (sumAll * 0.05)
    }

    if(lang === 'en' && sumAll <= 150 || lang === 'cz' && sumAll <= 2000){
      setSale(0)
    }

    if(lang === 'en'){
      setSum((Math.round(sumAll * 100) / 100).toFixed(2));
    }else{
      setSum(Math.round(sumAll));
    }
  }

  useEffect(() => {
    onSumItems()
  }, [])

  useEffect(() => {
    setBasket(dataContextState["basket"+lang])
    setBasketCount(dataContextState["basketCount"+lang])
    onSumItems()
  }, [router.query])


  useEffect(() => {
    dataContextDispatch({ state: basket, type: 'basket'+lang })
    dataContextDispatch({ state: basketCount, type: 'basketCount'+lang })
  }, [basketCount])

  const deleteItem = (e) => {
    e.preventDefault()
    basket.map((item, index) => {
      if(item.id === e.currentTarget.dataset.id && item.variantName === e.currentTarget.dataset.name){
        basket.splice(index, 1)
      }
    })
    let newBasketCount = +basketCount - 1
    setBasketCount(newBasketCount)
    setBasket(basket)
  }

  return(
    <div id="offcanvas-flip" className="uk-offcanvas" uk-offcanvas="flip: true; overlay: true;">
      <div className="uk-offcanvas-bar">

        <div className="tm-canvas-head">
          <span className="tm-circle-count">{basketCount ? basketCount : 0}</span>
          <h2>{translate.basket[lang]}</h2>
          <span className="tm-canvas-close" onClick={e => closeCanvas(e, '')}><img src="/assets/times.svg" /></span>
        </div>
        {basketCount && sum ? <div>
          {!!basket.length && basket.map((item, index) => <div key={index} className="tm-canvas-basket-item-wrap">
            <div className="tm-basket-item">
              <div data-src={item.imgUrl} className="tm-basket-img-wrap uk-background-contain" uk-img=""></div>
              <div className="tm-basket-item-info">
                <h3 className="tm-basket-item-head">{item.nameProduct}</h3>
                <span>{item.variantName}</span>
                <span>{item.variantPrice instanceof String ? item.variantPrice : item.variantPrice + ' ' + currency}</span>
                <div className="tm-canvas-basket-item-count">
                  <span>{item.countVariant} {translate.pc[lang]}</span>
                  <Link href={router.asPath + '?delete'+item.id+item.variantName}>
                    <a>
                      <button
                        className="tm-canvas-item-remove"
                        data-id={item.id}
                        data-name={item.variantName}
                        type="button"
                        onClick={e => deleteItem(e)}
                        uk-close="">
                      </button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>)}

          <div className="tm-basket-total">
            <table className="uk-table uk-table-divider">
              <tbody>
                <tr>
                  <td>{translate.delivery[lang]}</td>
                  <td>
                    <span className={`${lang === 'en' && sum > 100 || lang === 'cz' && sum > 1500 && "tm-positive"}`}>
                      {lang === 'cz' && sum <= 1500 && 'od 150 Kč'}
                      {lang === 'en' && sum <= 100 && '10 €'}
                      {lang === 'en' && sum > 100 && translate.free[lang]}
                      {lang === 'cz' && sum > 1500 && translate.free[lang]}
                    </span>
                  </td>
                </tr>
                {((lang === 'cz' && sum <= 1500) || (lang === 'en' && sum <= 100)) && <tr>
                  <td>{translate.deliveryFreeCanvas[lang]}</td>
                  <td>{translate.deliveryFreeCanvasValue[lang]}</td>
                </tr>}
                {((lang === 'cz' && sum <= 2000) || (lang === 'en' && sum <= 150)) && <tr>
                  <td>{translate.saleCanvas[lang]}</td>
                  <td>{translate.saleCanvasValue[lang]}</td>
                </tr>}
                {sale > 0 && <tr>
                  <td>{translate.sale[lang]}</td>
                  <td>-{sale} {currency}</td>
                </tr>}
                <tr>
                  <td>{translate.totalprice[lang]}</td>
                  <td>{sum} {currency}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="tm-basket-footer">
            <a href="/basket" onClick={(e) => closeCanvas(e, '/basket')} className="tm-button tm-bare-button">
              {translate.basket[lang]}
            </a>
            <a href="/basket/checkout" onClick={(e) => closeCanvas(e, '/basket/checkout')} className="tm-button tm-black-button">
              {translate.checkout[lang]}
            </a>
          </div>

        </div> : <p className="uk-text-center">{translate.emptybasket[lang]}</p>}

      </div>
    </div>
  )
}

export default Canvas
