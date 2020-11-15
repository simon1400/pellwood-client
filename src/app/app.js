// The basics
import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router';
import { DataStateContext } from './context/dataStateContext'
import loadable from '@loadable/component'
import {modal} from 'uikit'
import './scss/main.scss'
import getUrl from './function/getSearch'

const Header = loadable(() => import('./layout/header')) ;
const Routes = loadable(() => import('./routers.js')) ;
const Footer = loadable(() => import('./layout/footer'))
const Login = loadable(() => import('./user/components/login'))
const ForgotPassword = loadable(() => import('./user/components/forgotPassword'))
const ResetPassword = loadable(() => import('./user/components/resetPassword'))

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
