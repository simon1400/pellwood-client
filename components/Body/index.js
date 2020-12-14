import {useContext} from 'react'
import { DataStateContext } from '../../context/dataStateContext'
import Body from './Body'

const BodyWrap = ({
  setSum,
  basket,
  setBasket
}) => {
  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)

  const changeCount = (index, handle) => {
    var newBasket = basket
    if(handle === 'down' && newBasket[index].countVariant > 1){
      newBasket[index].countVariant = +basket[index].countVariant - 1
    }else if(handle === 'up'){
      newBasket[index].countVariant = +basket[index].countVariant + 1
    }
    setBasket([...newBasket])
    dataContextDispatch({ state: newBasket, type: 'basket' })

    sumBasket(newBasket)
  }

  const sumBasket = (newBasket) => {
    var sumAll = 0, sumItem = 0;
    newBasket.map((item, index) => {
      if(item.variantPrice instanceof String){
        sumItem = +item.variantPrice.split(' ')[0] * item.countVariant
      }else{
        sumItem = item.variantPrice * item.countVariant
      }
      sumAll = +sumItem + sumAll
    })

    setSum(sumAll)
  }

  const handleChange = (index, value) => {
    let newBasket = basket
    newBasket[index].countVariant = value
    setBasket([...newBasket])
    dataContextDispatch({ state: newBasket, type: 'basket' })
  }

  const deleteItem = (e, index) => {
    var basketCount = dataContextState.basketCount
    basketCount = basketCount - 1
    dataContextDispatch({ state: basketCount, type: 'basketCount' })
    let newBasket = basket
    newBasket.splice(index, 1)
    setBasket([...newBasket])
    dataContextDispatch({ state: newBasket, type: 'basket' })
    sumBasket(newBasket)
  }



  return <Body
    basket={basket}
    deleteItem={deleteItem}
    handleChange={handleChange}
    sumBasket={sumBasket}
    changeCount={changeCount}
  />
}

export default BodyWrap
