import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from './not-found';
import Homepage from './homepage';
import Catalog from './catalog';
import BlogShort from './blog/short';
import BlogFull from './blog/full';
import Product from './product';

// ------------------------------------------ BASKET ------------------------------------- //

import Basket from '../basket';
import ThankYou from '../basket/thankYou';


const Routers = () => {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />

      <Route exact path="/catalog" component={Catalog} />
      <Route exact path="/blog" component={BlogShort} />
      <Route exact path="/blog/:url" component={BlogFull} />
      <Route exact path="/product/:url" component={Product} />
      <Route exact path="/product/:url/:handle" component={Product} />

      <Route path="/basket" component={Basket} />
      <Route exact path="/thank-you" component={ThankYou} />

      <Route component={NotFound} />
    </Switch>
  )
}

export default Routers
