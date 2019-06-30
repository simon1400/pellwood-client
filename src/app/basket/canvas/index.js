import React from 'react';
import './style.scss'

import img from '../../assets/product-horizontal.jpg'

export default () => {

  const closeCanvas = () => {
    window.UIkit.offcanvas(window.UIkit.util.find('#offcanvas-flip')).hide();
  }

  return(
    <div id="offcanvas-flip" uk-offcanvas="flip: true; overlay: true">
      <div className="uk-offcanvas-bar">


        <div className="tm-canvas-head">
          <span className="tm-circle-count">4</span>
          <h2>Kosik</h2>
          <button className="tm-canvas-close uk-close-large" type="button" uk-close="" onClick={e => closeCanvas()}></button>
        </div>

        <div className="tm-canvas-basket-item-wrap">
          <div className="tm-basket-item">
            <div data-src={img} className="tm-basket-img-wrap uk-background-contain" uk-img=""></div>
            <div className="tm-basket-item-info">
              <h3 className="tm-basket-item-head">Combi Stick 8A Hornbeam</h3>
              <span>Hickory</span>
              <span>120 Kč</span>
              <div className="tm-canvas-basket-item-count">
                <span>4 páry</span>
                <button className="tm-canvas-item-remove" type="button" uk-close=""></button>
              </div>
            </div>
          </div>
          <div className="tm-basket-item">
            <div data-src={img} className="tm-basket-img-wrap uk-background-contain" uk-img=""></div>
            <div className="tm-basket-item-info">
              <h3 className="tm-basket-item-head">Combi Stick 8A Hornbeam</h3>
              <span>Hickory</span>
              <span>120 Kč</span>
              <div className="tm-canvas-basket-item-count">
                <span>4 páry</span>
                <button className="tm-canvas-item-remove" type="button" uk-close=""></button>
              </div>
            </div>
          </div>
        </div>

        <div className="tm-basket-total">
          <table className="uk-table uk-table-divider">
            <tbody>
                <tr>
                  <td>Doprava</td>
                  <td>ZDARMA</td>
                </tr>
                <tr>
                  <td>Celková cena</td>
                  <td>180 Kč</td>
                </tr>
            </tbody>
          </table>
        </div>


        <div className="tm-basket-footer">
          <a href="/" className="tm-button tm-bare-button">košík</a>
          <a href="/" className="tm-button tm-black-button">přejít k objednávce</a>
        </div>

      </div>
    </div>
  )
}
