import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from './pages/not-found';
import Homepage from './pages/homepage';
import Catalog from './pages/catalog';
import BlogShort from './pages/blog/short';
import BlogFull from './pages/blog/full';
import Product from './pages/product';

// ------------------------------------------ BASKET ------------------------------------- //

import Basket from './basket';
import ThankYou from './basket/thankYou';

// ------------------------------------------ USER ---------------------------------------//

import User from './user';


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

      <Route exact path="/user" component={User} />

      <Route component={NotFound} />
    </Switch>
  )
}

export default Routers
