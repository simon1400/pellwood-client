import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import { withRouter } from "react-router";
import './style.scss'

import NotFound from '../routes/not-found';
import Head from './components/head'
import Body from './components/body'
import Checkout from './components/checkout'
import Total from './components/total'
import TotalEnd from './components/total-end'


const Basket = () => {
  return (
    <main className="basket">
      <div className="tm-basket-content">
        <Switch>
          <Route exact path="/basket" render={() => <Head head="Váš nákupní košík"/>} />
          <Route exact path="/basket/checkout" render={() => <Head head="Objednávka"/>} />
        </Switch>
        <Switch>
          <Route exact path="/basket" component={Body} />
          <Route exact path="/basket/checkout" component={Checkout} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <div className="basket-right-panel">
        <Switch>
          <Route exact path="/basket" component={Total} />
          <Route exact path="/basket/checkout" component={TotalEnd} />
        </Switch>
        <div>
          <p>Všechny ceny jsou včetně DPH 21 %</p>
          <Route exact path="/basket/checkout" render={() => <p>Odesláním objednávky souhlasíte s <a href="">obchodními podmínkami</a>.</p>} />
        </div>
        <div>
          <div className="tm-basket-footer tm-footer-single">
            <Link to="/basket/checkout" className="tm-button tm-black-button">přejít k objednávce</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
export default withRouter(Basket)
