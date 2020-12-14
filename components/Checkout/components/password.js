import translate from '../../../data/staticTranslate'
import { useRouter } from 'next/router'
import localize from '../../../data/localize'


const Password = ({state, setState}) => {

  const router = useRouter()
  const {lang} = localize(router.locale)

  return(
    <div className="form_column">
      <div className="input_item">
        <input className={state.length ? 'hasValue' : ''} type="password" value={state} onChange={(e) => setState(e.target.value)}/>
        <label>{translate.formpassword[lang]}</label>
      </div>
      <div></div>
    </div>
  )
}


export default Password
