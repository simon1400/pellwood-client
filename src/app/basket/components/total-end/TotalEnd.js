import React from 'react'
import {Link} from 'react-router-dom'
import './style.scss'
import translate from '../../../data/staticTranslate'
import localize from '../../../data/localize'
const {lang, currency} = localize(window.location.href)

const TotalEnd = ({sum, sale, sumBefore, basket, delivery, payment}) => {

  return(
    <div className="tm-total-end">
      <div className="tm-head-total">
        <h2>{translate.ordersummary[lang]}</h2>
        <Link to={`${lang !== 'cz' ? '/' + lang : ''}/basket`}>{translate.editItems[lang]}</Link>
      </div>
      <div className="tm-canvas-basket-item-wrap">
        {(basket || []).map((item, index) => <div key={index} className="tm-basket-item">
          <div data-src={item.imgUrl} className="tm-basket-img-wrap uk-background-contain" uk-img=""></div>
          <div className="tm-basket-item-info">
            <h3 className="tm-basket-item-head">{item.nameProduct}</h3>
            {item.variantName === item.nameProduct ? '' : <span>{item.variantName}</span>}
            <span>{item.variantPrice instanceof String ? item.variantPrice : item.variantPrice+' '+currency}</span>
            <span>{item.countVariant} {translate.pc[lang]}</span>
          </div>
        </div>)}
      </div>
      <div className="tm-basket-total">
        <table className="uk-table uk-table-divider">
          <tbody>
            <tr>
              <td>{translate.delivery[lang]}</td>
              <td>
                <span className={(delivery === translate.free[lang] || (!!delivery.length && (lang === 'cz' && sumBefore > 1500 || lang === 'en' && sumBefore > 100))) ? 'tm-positive' : ''}>
                  {!!delivery.length && (lang === 'cz' && sumBefore < 1500 || lang === 'en' && sumBefore < 100) && delivery}
                  {!!delivery.length && (lang === 'cz' && sumBefore > 1500 || lang === 'en' && sumBefore > 100) && translate.free[lang]}
                  {!delivery.length && translate.notSelected[lang]}
                </span>
            </td>
            </tr>
            <tr>
              <td>{translate.payment[lang]}</td>
              <td><span className={(payment === translate.free[lang]) ? 'tm-positive' : ''}>{payment.length ? payment : translate.notSelected[lang]}</span></td>
            </tr>
            {sale > 0 && <tr>
              <td>{translate.sale[lang]}</td>
              <td>-{sale.replace(/\./g, ',')} {currency}</td>
            </tr>}
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
