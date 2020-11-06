import React from 'react'
import {Route} from 'react-router-dom'
import localize from '../../../data/localize'
const {lang} = localize(window.location.href)
const routes = ['/basket/checkout', `/${lang}/basket/checkout`]

const AcceptInfo = () => <>
  {routes.map((item, index) =>
    <Route exact path={item} render={() => <p>Odesláním objednávky souhlasíte s <a href="/">obchodními podmínkami</a>.</p>}/>)}
</>

export default AcceptInfo
