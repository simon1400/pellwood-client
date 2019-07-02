// The basics
import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router';
import UIkit from 'uikit'

import Header from './header';
import Routes from './routes';
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
