import React from 'react'

const Total = ({sum, currency}) => {
  return(
    <div className="tm-basket-total">
      <table className="uk-table uk-table-divider">
        <thead>
          <tr>
            <th colSpan="2">Souhrn objednávky</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>Doprava</td>
              <td><span className="tm-positive">ZDARMA</span></td>
            </tr>
            <tr>
              <td>Celková cena</td>
              <td>{sum} {' ' + currency}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Total
