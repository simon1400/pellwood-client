import React from 'react'
import './style.scss'

import img from '../../../assets/product-horizontal.jpg'

const TotalEnd = () => {
  return(
    <div className="tm-total-end">
      <div className="tm-head-total">
        <h2>Souhrn objednávky</h2>
        <a href="">Upravit položky</a>
      </div>
      <div className="tm-canvas-basket-item-wrap">
        <div className="tm-basket-item">
          <div data-src={img} className="tm-basket-img-wrap uk-background-contain" uk-img=""></div>
          <div className="tm-basket-item-info">
            <h3 className="tm-basket-item-head">Combi Stick 8A Hornbeam</h3>
            <span>Hickory</span>
            <span>120 Kč</span>
            <span>4 páry</span>
          </div>
        </div>
        <div className="tm-basket-item">
          <div data-src={img} className="tm-basket-img-wrap uk-background-contain" uk-img=""></div>
          <div className="tm-basket-item-info">
            <h3 className="tm-basket-item-head">Combi Stick 8A Hornbeam</h3>
            <span>Hickory</span>
            <span>120 Kč</span>
            <span>4 páry</span>
          </div>
        </div>
      </div>
      <div className="tm-basket-total">
        <table className="uk-table uk-table-divider">
          <tbody>
            <tr>
              <td>Doprava</td>
              <td><span className="tm-positive">ZDARMA</span></td>
            </tr>
            <tr>
              <td>Celková cena</td>
              <td>180 Kč</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TotalEnd
