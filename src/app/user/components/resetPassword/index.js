import React, {useState, useEffect} from 'react'
import {modal} from 'uikit'
import './style.scss'
import {AxiosAPI} from '../../../restClient'
import {Link, withRouter} from 'react-router-dom'
import translate from '../../../data/staticTranslate'
import getUrl from '../../../function/getSearch'
import localize from '../../../data/localize'
const {lang, currency} = localize(window.location.href)

const ResetPassword = ({history}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState({
    password: false,
    confirmPassword: false
  })

  useEffect(() => {
    if(getUrl(window.location.search).email){
      setEmail(Buffer.from(getUrl(window.location.search).email, 'base64').toString())
    }

  }, [])

  const closeModal = () => {
    modal('#reset-password').hide();
  }

  const handleInput = (e, type) => {
    if(type === 'password'){
      setError({ ...error, password: false})
      setPassword(e.target.value)
    }
    if(type === 'confirmPassword'){
      setError({ ...error, password: false})
      setConfirmPassword(e.target.value)
    }
  }

  const onBlur = () => {
    if(password !== confirmPassword){
      setError({...error, confirmPassword: true})
      return true
    }
    return false
  }


  const send = (e) => {
    e.preventDefault()

    if(onBlur()) return


    AxiosAPI.put(`${process.env.REACT_APP_API}/user/password`, {email, password}).then(res => {
      setDone(true)
      history.push({search: ''})
    }).catch(err => console.log(err))
  }

  return(
    <div id="reset-password" className="uk-flex-top" uk-modal="">
      <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

        <div className="tm-canvas-head" style={{marginTop: 0}}>
          <h2>{translate.forgottenpassword[lang]}</h2>
          <button className="tm-canvas-close uk-close-large" type="button" uk-close="" onClick={e => closeModal()}></button>
        </div>

        {!done && <div className="login_form">
          <form onSubmit={e => send(e)}>

            {error.loginEmail === 'notExist' && <div className="uk-alert-danger" uk-alert=""><p>Zadaliste spatne email nebo heslo</p></div>}
            {error.loginEmail === 'exist' && <div className="uk-alert-danger" uk-alert=""><p>Uzivatel s timto emailem uz existuje</p></div>}
            {(error.loginEmail === 'empty' || error.loginPassword === 'empty') && <div className="uk-alert-danger" uk-alert=""><p>Vyplňte všechna pole</p></div>}

            <div className="uk-margin input_item">
              <input className={`${password.length && 'hasValue'} ${error.password && 'invalid'}`} type="password" value={password} onChange={e => handleInput(e, 'password')} tabIndex="1" />
              <label>Nove {translate.formpassword[lang]}</label>
            </div>
            <div className="uk-margin input_item">
              <input className={`${confirmPassword.length && 'hasValue'} ${error.confirmPassword && 'invalid'}`} type="password" onBlur={() => onBlur()} value={confirmPassword} onChange={e => handleInput(e, 'confirmPassword')} tabIndex="2" />
              <label>Opakovat nove {translate.formpassword[lang]}</label>
            </div>

            <button type="submit" className="tm-button tm-black-button uk-width-1-1">Obnovit heslo</button>
          </form>
        </div>}

        {done && <div className="uk-alert-success" uk-alert=""><p>Heslo je uspesne obnoveno</p></div>}

      </div>
    </div>
  )
}

export default withRouter(ResetPassword)
