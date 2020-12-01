import React from 'react'
import {Route} from 'react-router-dom'
import localize from '../../../data/localize'
import Total from './Total'
const {lang} = localize(window.location.href)
const routes = ['/basket', `/${lang}/basket`]


const TotalWrap = ({sum, sale}) => <>
  {routes.map((item, index) => <Route exact key={index} path={item} render={() => <Total sum={sum} sale={sale} />}/>)}
</>

export default TotalWrap
