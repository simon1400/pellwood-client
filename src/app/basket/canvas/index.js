import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import './style.scss'
import UIkit from 'uikit'

export default ({update, currency}) => {

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
    UIkit.offcanvas(UIkit.util.find('#offcanvas-flip')).hide();
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
    <div id="offcanvas-flip" uk-offcanvas="flip: true; overlay: true">
      <div className="uk-offcanvas-bar">

        <div className="tm-canvas-head">
          <span className="tm-circle-count">{basketCount ? basketCount : 0}</span>
          <h2>Košík</h2>
          <Link to={window.location.pathname}><button className="tm-canvas-close uk-close-large" type="button" uk-close="" onClick={e => closeCanvas()}></button></Link>
        </div>
        {basketCount ?
          <div>
            {basket ? basket.map((item, index) =>
              <div key={index} className="tm-canvas-basket-item-wrap">
                <div className="tm-basket-item">
                  <div data-src={item.imgUrl} className="tm-basket-img-wrap uk-background-contain" uk-img=""></div>
                  <div className="tm-basket-item-info">
                    <h3 className="tm-basket-item-head">{item.nameProduct}</h3>
                    <span>{item.variantName}</span>
                    <span>{item.variantPrice instanceof String ? item.variantPrice : item.variantPrice+' '+currency}</span>
                    <div className="tm-canvas-basket-item-count">
                      <span>{item.countVariant} páry</span>
                      <Link to={window.location.pathname +'?delete'+item.id+item.variantName}><button className="tm-canvas-item-remove" data-id={item.id} data-name={item.variantName} type="button" onClick={e => deleteItem(e)} uk-close=""></button></Link>
                    </div>
                  </div>
                </div>
              </div>)
             : ''}


          <div className="tm-basket-total">
            <table className="uk-table uk-table-divider">
              <tbody>
                <tr>
                  <td>Doprava</td>
                  <td>ZDARMA</td>
                </tr>
                <tr>
                  <td>Celková cena</td>
                  <td>{basket !== undefined ? onSumItems() : 0}{' ' + currency}</td>
                </tr>
              </tbody>
            </table>
          </div>



          <div className="tm-basket-footer">
            <Link to="/basket" className="tm-button tm-bare-button" onClick={() => closeCanvas()}>košík</Link>
            <Link to="/basket/checkout" className="tm-button tm-black-button" onClick={() => closeCanvas()}>přejít k objednávce</Link>
          </div>
        </div>
        : <p className="uk-text-center">Váš košík je prázdný</p>
      }

      </div>
    </div>
  )
}
