import React from 'react'
import TotalEnd from './TotalEnd'
import {Route} from 'react-router-dom'
import localize from '../../../data/localize'
const {lang} = localize(window.location.href)
const routes = ['/basket/checkout', `/${lang}/basket/checkout`]

const TotalEndWrap = ({
  sum,
  sale,
  sumBefore,
  basket,
  delivery,
  payment
}) => <>
  {routes.map((item, index) => <Route exact path={item} render={() => <TotalEnd sum={sum} sale={sale} sumBefore={sumBefore} basket={basket} delivery={delivery} payment={payment} />}/>)}
</>

export default TotalEndWrap
