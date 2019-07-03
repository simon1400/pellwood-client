import React from 'react'
import {Link} from 'react-router-dom'
import './style.scss'

const TotalEnd = ({sum, basket, delivery, payment}) => {

  return(
    <div className="tm-total-end">
      <div className="tm-head-total">
        <h2>Souhrn objednávky</h2>
        <Link to="/basket">Upravit položky</Link>
      </div>
      <div className="tm-canvas-basket-item-wrap">
      {(basket || []).map((item, index) =>
        <div key={index} className="tm-basket-item">
          <div data-src={item.imgUrl} className="tm-basket-img-wrap uk-background-contain" uk-img=""></div>
          <div className="tm-basket-item-info">
            <h3 className="tm-basket-item-head">{item.nameProduct}</h3>
            <span>{item.variantName}</span>
            <span>{item.variantPrice}</span>
            <span>{item.countVariant} páry</span>
          </div>
        </div>
      )}
      </div>
      <div className="tm-basket-total">
        <table className="uk-table uk-table-divider">
          <tbody>
            <tr>
              <td>Doprava</td>
              <td><span className={delivery === 'ZDARMA' ? 'tm-positive' : ''}>{delivery.length ? delivery : 'Navybrano'}</span></td>
            </tr>
            <tr>
              <td>Platba</td>
              <td><span className={payment === 'ZDARMA' ? 'tm-positive' : ''}>{payment.length ? payment : 'Navybrano'}</span></td>
            </tr>
            <tr>
              <td>Celková cena</td>
              <td>{sum} Kč</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TotalEnd
