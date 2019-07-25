import React from 'react'
import {Link} from 'react-router-dom'
import './style.scss'

const Body = ({setSum, sum, basket, setBasket}) => {

  const changeCount = (index, handle) => {
    var newBasket = basket
    if(handle === 'down' && newBasket[index].countVariant > 0){
      newBasket[index].countVariant = basket[index].countVariant - 1
    }else if(handle === 'up'){
      newBasket[index].countVariant = basket[index].countVariant + 1
    }
    setBasket([...newBasket])

    localStorage.setItem('basket', JSON.stringify([...newBasket]))

    sumBasket(newBasket)
  }

  const sumBasket = (newBasket) => {
    var sumAll = 0, sumItem = 0;
    newBasket.map((item, index) => {
      sumItem = +item.variantPrice.split(' ')[0] * item.countVariant
      sumAll = +sumItem + sumAll
    })

    setSum(sumAll)
  }

  const handleChange = (index, value) => {
    let newBasket = basket
    newBasket[index].countVariant = value
    setBasket([...newBasket])
    localStorage.setItem('basket', JSON.stringify([...newBasket]))
  }

  const deleteItem = (e, index) => {
    var basketCount = JSON.parse(localStorage.getItem('basketCount'))
    basketCount = basketCount - 1
    localStorage.setItem('basketCount', JSON.stringify(basketCount))
    let newBasket = basket
    newBasket.splice(index, 1)
    setBasket([...newBasket])
    localStorage.setItem('basket', JSON.stringify([...newBasket]))
    sumBasket(newBasket)
  }

  return (
    <div className="tm-basket-body">
      <table className="uk-table uk-table-divider uk-table-middle">
        <thead>
          <tr>
            <th>Položka</th>
            <th>Počet</th>
            <th>Cena</th>
          </tr>
        </thead>
        <tbody>

        {basket.map((item, index) =>
          <tr key={index}>
            <td>
              <div className="tm-basket-item">
                <div data-src={item.imgUrl} className="tm-basket-img-wrap uk-background-contain" uk-img=""></div>
                <div className="tm-basket-item-info">
                  <h3 className="tm-basket-item-head">{item.nameProduct}</h3>
                  <span>{item.variantName}</span>
                  <div className="tm-remove-item"><Link to={window.location.pathname +'?delete'+item.variantName.replace(/ /g, "_")} onClick={e => deleteItem(e, index)}><button uk-close=""></button>Odstranit</Link></div>
                </div>
              </div>
            </td>
            <td>
              <div>
                <div className="custom_number quantity">
                  <input type="number" min="1" max="1000" step="1" value={item.countVariant} onChange={(e) => handleChange(index, e.target.value)} />
                  <div className="quantity-nav">
                    <div className="quantity-button quantity-up" onClick={() => changeCount(index, 'up')}>+</div>
                    <div className="quantity-button quantity-down" onClick={() => changeCount(index, 'down')}>-</div>
                  </div>
                </div>
              </div>
            </td>
            <td><span className="basket-body-price">{item.variantPrice}</span></td>
          </tr>
        )}


        </tbody>
      </table>
    </div>
  )
}

export default Body
