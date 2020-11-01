import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import './style.scss'
import {offcanvas} from 'uikit'
import translate from '../../data/staticTranslate'

import localize from '../../data/localize'
const {lang, currency} = localize(window.location.href)

export default ({update}) => {

  const [basket, setBasket] = useState([])
  const [basketCount, setBasketCount] = useState(0)

  useEffect(() => {
    setBasket(JSON.parse(localStorage.getItem('basket')))
    setBasketCount(JSON.parse(localStorage.getItem('basketCount')))
  }, [])

  useEffect(() => {
    setBasket(JSON.parse(localStorage.getItem('basket')))
    setBasketCount(JSON.parse(localStorage.getItem('basketCount')))
  }, [window.location.search.length])


  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket))
    localStorage.setItem('basketCount', basketCount)
  }, [basketCount])


  const closeCanvas = () => {
    offcanvas('#offcanvas-flip').hide();
  }

  const onSumItems = () => {
    let sumAll = 0, sumItem = 0;

    if(basket){
      basket.map((item, index) => {
        if(item.variantPrice instanceof String){
          sumItem = +item.variantPrice.split(' ')[0] * item.countVariant
        }else{
          sumItem = item.variantPrice * item.countVariant
        }

        sumAll = +sumItem + sumAll
      })
    }

    return sumAll;
  }

  const deleteItem = (e) => {
    e.preventDefault()
    basket.map((item, index) => {
      if(item.id === e.currentTarget.dataset.id && item.variantName === e.currentTarget.dataset.name){
        basket.splice(index, 1)
      }
    })
    let newBasketCount = +basketCount - 1
    update(Math.random)
    setBasketCount(newBasketCount)
    setBasket(basket)
  }

  return(
    <div id="offcanvas-flip" uk-offcanvas="flip: true; overlay: true;">
      <div className="uk-offcanvas-bar">

        <div className="tm-canvas-head">
          <span className="tm-circle-count">{basketCount ? basketCount : 0}</span>
          <h2>{translate.basket[lang]}</h2>
          <Link to={window.location.pathname}><button className="tm-canvas-close uk-close-large" type="button" uk-close="" onClick={e => closeCanvas()}></button></Link>
        </div>
        {basketCount ? <div>
          {!!basket.length && basket.map((item, index) => <div key={index} className="tm-canvas-basket-item-wrap">
            <div className="tm-basket-item">
              <div data-src={item.imgUrl} className="tm-basket-img-wrap uk-background-contain" uk-img=""></div>
              <div className="tm-basket-item-info">
                <h3 className="tm-basket-item-head">{item.nameProduct}</h3>
                <span>{item.variantName}</span>
                <span>{item.variantPrice instanceof String ? item.variantPrice : item.variantPrice + ' ' + currency}</span>
                <div className="tm-canvas-basket-item-count">
                  <span>{item.countVariant} páry</span>
                  <Link to={window.location.pathname +'?delete'+item.id+item.variantName}>
                    <button
                      className="tm-canvas-item-remove"
                      data-id={item.id}
                      data-name={item.variantName}
                      type="button"
                      onClick={e => deleteItem(e)}
                      uk-close="">
                    </button>
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
                  <td>ZDARMA</td>
                </tr>
                <tr>
                  <td>{translate.totalprice[lang]}</td>
                  <td>{basket !== undefined ? onSumItems() : 0}{' ' + currency}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="tm-basket-footer">
            <Link to={`${lang !== 'cz' && '/' + lang}/basket`} className="tm-button tm-bare-button" onClick={() => closeCanvas()}>{translate.basket[lang]}</Link>
            <Link to={`${lang !== 'cz' && '/' + lang}/basket/checkout`} className="tm-button tm-black-button" onClick={() => closeCanvas()}>{translate.checkout[lang]}</Link>
          </div>

        </div> : <p className="uk-text-center">{translate.emptybasket[lang]}</p>}

      </div>
    </div>
  )
}
