import React from 'react'
import {Link} from 'react-router-dom'
import './style.scss'
import translate from '../../../data/staticTranslate'

import localize from '../../../data/localize'
const {lang, currency} = localize(window.location.href)

const TotalEnd = ({sum, basket, delivery, payment, currency}) => {

  return(
    <div className="tm-total-end">
      <div className="tm-head-total">
        <h2>{translate.ordersummary[lang]}</h2>
        <Link to="/basket">Upravit položky</Link>
      </div>
      <div className="tm-canvas-basket-item-wrap">
      {(basket || []).map((item, index) =>
        <div key={index} className="tm-basket-item">
          <div data-src={item.imgUrl} className="tm-basket-img-wrap uk-background-contain" uk-img=""></div>
          <div className="tm-basket-item-info">
            <h3 className="tm-basket-item-head">{item.nameProduct}</h3>
            {item.variantName === item.nameProduct ? '' : <span>{item.variantName}</span>}
            <span>{item.variantPrice instanceof String ? item.variantPrice : item.variantPrice+' '+currency}</span>
            <span>{item.countVariant} páry</span>
          </div>
        </div>
      )}
      </div>
      <div className="tm-basket-total">
        <table className="uk-table uk-table-divider">
          <tbody>
            <tr>
              <td>{translate.delivery[lang]}</td>
              <td><span className={(delivery === 'ZDARMA' || delivery === 'FREE') ? 'tm-positive' : ''}>{delivery.length ? delivery : 'Nevybráno'}</span></td>
            </tr>
            <tr>
              <td>{translate.payment[lang]}</td>
              <td><span className={(payment === 'ZDARMA' || payment === 'FREE') ? 'tm-positive' : ''}>{payment.length ? payment : 'Nevybráno'}</span></td>
            </tr>
            <tr>
              <td>{translate.totalprice[lang]}</td>
              <td>{sum} {' ' + currency}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TotalEnd
