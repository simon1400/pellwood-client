import React from 'react'

import mastercard from './assets/mastercard.svg'
import visa from './assets/visa.svg'

export default () => {
  return (
    <footer>
      <div className="uk-container uk-container-expand uk-height-1-1">
        <div className="uk-flex uk-flex-between uk-flex-middle uk-height-1-1 uk-flex-wrap" uk-height-match="target: > .footer-item">
          <div className="cart_method_foot uk-flex uk-flex-left">
            <div>
              <img src={mastercard} alt="Mastercard" />
            </div>
            <div>
              <img src={visa} alt="Visa" />
            </div>
          </div>
          <div className="footer-item">
            <h4 className="footer-item-head">Address</h4>
            <p>Čestice 214, 387 19 <br/>
              Czechia</p>
          </div>
          <div className="footer-item">
            <h4 className="footer-item-head">Contact</h4>
            <p>pellwood@nts.cz <br/>
              +420 777 021 800</p>
          </div>
          <div className="footer-item">
            <ul>
              <li className="footer-item-head">Informace o nákupu</li>
              <li><a href="/">Obchodní podmínky</a></li>
              <li><a href="/">Ochranya osobních údajů</a></li>
            </ul>
          </div>
          <div className="footer-item">
            <ul>
              <li className="footer-item-head">Follow us</li>
              <li><a href="/">Instagram</a></li>
              <li><a href="/">Facebook</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
