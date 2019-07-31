import React from 'react'
import UIkit from 'uikit'
import './style.scss'
import {Link} from 'react-router-dom'


const Login = ({email, password, setEmail, setPassword, onRegister, onLogin}) => {

  const closeModal = () => {
    UIkit.modal(UIkit.util.find('#modal-login')).hide();
  }

  return(
    <div id="modal-login" className="uk-flex-top" uk-modal="">
      <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

        <div className="tm-canvas-head">
          <h2>Přihlašte se</h2>
          <button className="tm-canvas-close uk-close-large" type="button" uk-close="" onClick={e => closeModal()}></button>
        </div>

        <div className="login_form">
          <form onSubmit={e => onLogin(e)}>
            <div className="input_login">
              <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="input_login">
              <input type="password" placeholder="Heslo" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="tm-button tm-black-button uk-width-1-1">Přihlašte se</button>
            <Link to="/basket" className="tm-button tm-bare-button tm-button-text uk-width-1-1"><span>zapomenuté heslo</span></Link>
            <hr />
            <p>Nemáte jěště účet?</p>
            <button className="tm-button tm-bare-button uk-width-1-1" onClick={e => onRegister(e)}><span>REGISTROVAT</span></button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Login
