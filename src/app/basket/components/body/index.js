import React from 'react'
import './style.scss'

import img from '../../../assets/product-horizontal.jpg'

const Body = () => {
  return (
    <div className="tm-basket-body">
      <table class="uk-table uk-table-divider uk-table-middle">
        <thead>
          <tr>
            <th>Položka</th>
            <th>Počet</th>
            <th>Cena</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="tm-basket-item">
                <div data-src={img} className="tm-basket-img-wrap uk-background-contain" uk-img=""></div>
                <div className="tm-basket-item-info">
                  <h3 className="tm-basket-item-head">Combi Stick 8A Hornbeam</h3>
                  <span>Hickory</span>
                  <div className="tm-remove-item"><a href="/"><button uk-close=""></button>Odstranit</a></div>
                </div>
              </div>
            </td>
            <td>
              <div>
                <div className="custom_number quantity">
                  <input type="number" min="1" max="1000" step="1" value="1" />
                  <div className="quantity-nav">
                    <div className="quantity-button quantity-up">+</div>
                    <div className="quantity-button quantity-down">-</div>
                  </div>
                </div>
              </div>
            </td>
            <td><span className="basket-body-price">120 Kč</span></td>
          </tr>

          <tr>
            <td>
              <div className="tm-basket-item">
                <div data-src={img} className="tm-basket-img-wrap uk-background-contain" uk-img=""></div>
                <div className="tm-basket-item-info">
                  <h3 className="tm-basket-item-head">Combi Stick 8A Hornbeam</h3>
                  <span>Hickory</span>
                  <div className="tm-remove-item"><a href="/"><button uk-close=""></button>Odstranit</a></div>
                </div>
              </div>
            </td>
            <td>
              <div>
                <div className="custom_number quantity">
                  <input type="number" min="1" max="1000" step="1" value="1" />
                  <div className="quantity-nav">
                    <div className="quantity-button quantity-up">+</div>
                    <div className="quantity-button quantity-down">-</div>
                  </div>
                </div>
              </div>
            </td>
            <td><span className="basket-body-price">120 Kč</span></td>
          </tr>

          <tr>
            <td>
              <div className="tm-basket-item">
                <div data-src={img} className="tm-basket-img-wrap uk-background-contain" uk-img=""></div>
                <div className="tm-basket-item-info">
                  <h3 className="tm-basket-item-head">Combi Stick 8A Hornbeam</h3>
                  <span>Hickory</span>
                  <div className="tm-remove-item"><a href="/"><button uk-close=""></button>Odstranit</a></div>
                </div>
              </div>
            </td>
            <td>
              <div>
                <div className="custom_number quantity">
                  <input type="number" min="1" max="1000" step="1" value="1" />
                  <div className="quantity-nav">
                    <div className="quantity-button quantity-up">+</div>
                    <div className="quantity-button quantity-down">-</div>
                  </div>
                </div>
              </div>
            </td>
            <td><span className="basket-body-price">120 Kč</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Body
