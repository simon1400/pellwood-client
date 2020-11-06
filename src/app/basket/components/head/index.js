import React from 'react'
import {Switch, Route} from 'react-router-dom'
import translate from '../../../data/staticTranslate'
import Head from './Head'
import localize from '../../../data/localize'
const {lang} = localize(window.location.href)

const routes = [
  {basket: '/basket', checkout: '/basket/checkout'},
  {basket: `/${lang}/basket`, checkout: `/${lang}/basket/checkout`},
]

const HeadWrap = () => <>
  {routes.map((item, index) => <Switch key={index}>
    <Route exact path={item.basket} render={() => <Head head={translate.yourBasket[lang]} />} />
    <Route exact path={item.checkout} render={() => <Head head="Objednávka"/>} />
  </Switch>)}
</>

export default HeadWrap
