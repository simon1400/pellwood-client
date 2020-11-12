import React from 'react'
import {Route, Switch, Link} from 'react-router-dom'
import translate from '../../../data/staticTranslate'
import localize from '../../../data/localize'
const {lang} = localize(window.location.href)

const routes = [
  {basket: '/basket', checkout: '/basket/checkout'},
  {basket: `/${lang}/basket`, checkout: `/${lang}/basket/checkout`},
]

const ButtonsSubmit = ({sendOrder}) => <>
  {routes.map((item, index) => <Switch key={index}>
    <Route exact path={item.basket} render={() => <Link to={`${lang !== 'cz' ? '/' + lang : ''}/basket/checkout`} className="tm-button tm-black-button">{translate.checkout[lang]}</Link>} />
    <Route exact path={item.checkout} render={() => <button className="tm-button tm-black-button" onClick={() => sendOrder()}>{translate.sendorder[lang]}</button>} />
  </Switch>)}
</>

export default ButtonsSubmit
