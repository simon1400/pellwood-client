import React from 'react'
import translate from '../../../data/staticTranslate'
import localize from '../../../data/localize'
const {lang, currency} = localize(window.location.href)

const Total = ({sum, sale}) => <div className="tm-basket-total">
  <table className="uk-table uk-table-divider">
    <thead>
      <tr>
        <th colSpan="2">{translate.ordersummary[lang]}</th>
      </tr>
    </thead>
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


export default Total
