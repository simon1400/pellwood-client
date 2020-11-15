// The basics
import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router';
import { DataStateContext } from './context/dataStateContext'
import Header from './layout/header';
import Routes from './routers.js';
import Footer from './layout/footer'
import Login from './user/components/login'
import ForgotPassword from './user/components/forgotPassword'
import ResetPassword from './user/components/resetPassword'
import getUrl from './function/getSearch'
import {modal} from 'uikit'

import './scss/main.scss'

const App = ({match}) => {

  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)
  const [loginUser, setLoginUser] = useState(false)

  useEffect(() => {
    if(dataContextState.user){
      setLoginUser(true)
    }
    var serchUrl = getUrl(window.location.search);
    if(serchUrl.email){
      modal('#reset-password').show();
    }

  }, [])

  return (
    <>
      <Header loginUser={loginUser} />
      <Routes />
      <Footer />
      <ForgotPassword />
      <ResetPassword />
      <Login setLoginUser={setLoginUser}/>
    </>
  );
}

export default withRouter(App);
