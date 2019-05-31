// The basics
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';

// Action creators and helpers
// import { isServer } from '../store';

import Header from './header';
import Routes from './routes';
import Footer from './footer'

import './scss/main.scss'

class App extends Component {

  render() {
    return (
      <Fragment>
        <Header />
        <Routes />
        <Footer />
      </Fragment>
    );
  }
}

export default withRouter(App);
