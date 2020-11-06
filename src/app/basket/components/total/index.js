import React from 'react'
import {Route} from 'react-router-dom'
import localize from '../../../data/localize'
import Total from './Total'
const {lang} = localize(window.location.href)
const routes = ['/basket', `/${lang}/basket`]


const TotalWrap = ({sum}) => <>
  {routes.map((item, index) => <Route exact path={item} render={() => <Total sum={sum} />}/>)}
</>

export default TotalWrap
