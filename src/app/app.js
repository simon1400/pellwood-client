// The basics
import React, { Fragment } from 'react';
import { withRouter } from 'react-router';

import Header from './header';
import Routes from './routers.js';
import Footer from './footer'

import './scss/main.scss'

const App = () => {
  return (
    <Fragment>
      <Header />
      <Routes />
      <Footer />
    </Fragment>
  );
}

export default withRouter(App);
