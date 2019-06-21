import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from '../layout/authenticated-route';
import UnauthenticatedRoute from '../layout/unauthenticated-route';
import Loadable from 'react-loadable';

import NotFound from './not-found';

const Homepage = Loadable({
  loader: () => import(/* webpackChunkName: "homepage" */ './homepage'),
  loading: () => null,
  modules: ['homepage']
});

const Login = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ './login'),
  loading: () => null,
  modules: ['login']
});

const Logout = Loadable({
  loader: () => import(/* webpackChunkName: "logout" */ './logout'),
  loading: () => null,
  modules: ['logout']
});

const Profile = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ './profile'),
  loading: () => null,
  modules: ['profile']
});

const Catalog = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ './catalog'),
  loading: () => null,
  modules: ['catalog']
});

const BlogShort = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ './blog/short'),
  loading: () => null,
  modules: ['blog-short']
});

const BlogFull = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ './blog/full'),
  loading: () => null,
  modules: ['blog-full']
});

const Product = Loadable({
  loader: () => import(/* webpackChunkName: "profile" */ './product'),
  loading: () => null,
  modules: ['product']
});



// ------------------------------------------ BASKET ------------------------------------- //



export default () => (
  <Switch>
    <Route exact path="/" component={Homepage} />

    <Route exact path="/profile/:id" component={Profile} />
    <Route exact path="/catalog" component={Catalog} />
    <Route exact path="/blog" component={BlogShort} />
    <Route exact path="/blog/:url" component={BlogFull} />
    <Route exact path="/product/:id" component={Product} />

    <UnauthenticatedRoute exact path="/login" component={Login} />
    <AuthenticatedRoute exact path="/logout" component={Logout} />

    <Route component={NotFound} />
  </Switch>
);
