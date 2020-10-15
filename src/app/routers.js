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

const routesArr = [
  {
    path: '/',
    component: Homepage,
    exact: true
  },
  {
    path: '/produkty',
    component: Catalog,
    exact: true
  },
  {
    path: '/produkt/:url',
    component: Product,
    exact: true
  },
  {
    path: '/produkt/:url/:handle',
    component: Product,
    exact: true
  },
  {
    path: '/:category/kategorie',
    component: BlogShort,
    exact: true
  },
  {
    path: '/:url/:category/clanek',
    component: BlogFull,
    exact: true
  },
  {
    path: '/basket',
    component: Basket,
    exact: false
  },
  {
    path: '/thank-you',
    component: ThankYou,
    exact: true
  },
  {
    path: '/user',
    component: User,
    exact: true
  }
]


const Routers = () => {
  return (
    <Switch>
      {routesArr.map((item, index) => <Route key={index} exact={item.exact} path={item.path} component={item.component} />)}
      {routesArr.map((item, index) => <Route key={index} exact={item.exact} path={`/:lang${item.path}`} component={item.component} />)}
      <Route component={NotFound} />
    </Switch>
  )
}

export default Routers
