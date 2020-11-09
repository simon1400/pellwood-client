// The basics
import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios'
import { DataStateContext } from './context/dataStateContext'
import Header from './layout/header';
import Routes from './routers.js';
import Footer from './layout/footer'
import Login from './user/components/login'
import ForgotPassword from './user/components/forgotPassword'

import './scss/main.scss'

const App = ({match}) => {

  const { dataContextState, dataContextDispatch } = useContext(DataStateContext)
  const [loginUser, setLoginUser] = useState(false)

  useEffect(() => {
    if(dataContextState.user){
      setLoginUser(true)
    }
    
  }, [])

  return (
    <>
      <Header loginUser={loginUser} />
      <Routes />
      <Footer />
      <ForgotPassword />
      <Login setLoginUser={setLoginUser}/>
    </>
  );
}

export default withRouter(App);
