import {useState, useEffect} from 'react'
import translate from '../../data/staticTranslate'
import { useRouter } from 'next/router'
import localize from '../../data/localize'


const Corporate = ({data, setData}) => {

  const router = useRouter()
  const {lang} = localize(router.locale)

  const [state, setState] = useState({
    email: '',
    phone: '',
    name: '',
    surname: '',
    country: '',
    city: '',
    address: '',
    code: '',
    anotherAddressCheck: false,
    companyDataCheck: false
  })

  const handleChange = (name, value) => {
    let newData = data;
    newData[name] = value;
    setData({...newData})
  }

  useEffect(() => {
    setState(data)
  }, [data])

  return (
    <div className="form_container">
      <div className="form_column">
        <div className="uk-margin input_item">
          <input className={state.companyName?.length ? 'hasValue' : ''} type="text" value={state.companyName} onChange={(e) => handleChange('companyName', e.target.value)} />
          <label>Obchodní {translate.formname[lang]}</label>
        </div>
        <div className="uk-margin input_item">
          <input className={state.ico?.length ? 'hasValue' : ''} type="text" value={state.ico} onChange={(e) => handleChange('ico', e.target.value)} />
          <label>IČO</label>
        </div>
        <div className="uk-margin input_item">
          <input className={state.dic?.length ? 'hasValue' : ''} type="text" value={state.dic} onChange={(e) => handleChange('dic', e.target.value)} />
          <label>DIČ</label>
        </div>
      </div>
      <div className="form_column"></div>
    </div>
  )
}


export default Corporate
