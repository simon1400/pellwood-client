// The basics
import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router';

import Header from './layout/header';
import Routes from './routers.js';
import Footer from './layout/footer'

import './scss/main.scss'

const App = ({match}) => {

  return (
    <Fragment>
      <Header />
      <Routes />
      <Footer />
    </Fragment>
  );
}

export default withRouter(App);
