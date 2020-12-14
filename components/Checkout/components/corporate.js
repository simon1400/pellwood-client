import translate from '../../../data/staticTranslate'
import { useRouter } from 'next/router'
import localize from '../../../data/localize'

const Corporate = ({state, setState}) => {

  const router = useRouter()
  const {lang} = localize(router.locale)

  const handleChange = (name, value) => {
    let newState = state;
    newState[name] = value;
    setState({...newState})
  }

  return (
    <div>
      <div className="form_column">
        <div className="input_item">
          <input className={state.companyName?.length && 'hasValue'} type="text" value={state.companyName} onChange={(e) => handleChange('companyName', e.target.value)} />
          <label>{translate.companyName[lang]}</label>
        </div>
        <div className="input_item"></div>
      </div>
      <div className="form_column">
        <div className="input_item">
          <input className={state.ico?.length && 'hasValue'} type="text" value={state.ico} onChange={(e) => handleChange('ico', e.target.value)} />
          <label>{translate.ico[lang]}</label>
        </div>
        <div className="input_item"></div>
      </div>
      <div className="form_column">
        <div className="input_item">
          <input className={state.dic?.length && 'hasValue'} type="text" value={state.dic} onChange={(e) => handleChange('dic', e.target.value)} />
          <label>{translate.dic[lang]}</label>
        </div>
        <div className="input_item"></div>
      </div>
    </div>
  )
}


export default Corporate
