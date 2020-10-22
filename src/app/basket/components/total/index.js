import React from 'react'
import translate from '../../../data/staticTranslate'

import localize from '../../../data/localize'
const {lang, currency} = localize(window.location.href)

const Total = ({sum, currency}) => {
  return(
    <div className="tm-basket-total">
      <table className="uk-table uk-table-divider">
        <thead>
          <tr>
            <th colSpan="2">{translate.ordersummary[lang]}</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>{translate.delivery[lang]}</td>
              <td><span className="tm-positive">ZDARMA</span></td>
            </tr>
            <tr>
              <td>{translate.totalprice[lang]}</td>
              <td>{sum} {' ' + currency}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Total
