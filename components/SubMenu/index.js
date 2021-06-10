import {useState, useEffect} from 'react';
import Link from "next/link";
import translate from '../../data/staticTranslate'
import localize from '../../data/localize'
import { useRouter } from 'next/router'
import changeUrl from '../../helpers/changeUrl'

const SubMenu = ({
  data,
  articles = false,
  setReset = false
}) => {

  const router = useRouter()
  const {lang} = localize(router.locale)
  const [baseUrl, setBaseUrl] = useState('')

  useEffect(() => {
    if(lang === 'en'){
      setBaseUrl(router.asPath.split('/')[0])
    }else{
      setBaseUrl(router.asPath.split('/')[1])
    }
  }, [])

  const handleChangeUrl = (e, id) => {
    e.preventDefault()
    setReset(true)
    changeUrl(6, id, false, {}, router)
  }

  return(
    <nav className="sub_menu">
      <ul>
        {baseUrl === 'produkty' && <li className={`sub_menu_item${router.query.category === 'all' ? ' active_sub' : ''}`}>
          <a href="#catalog-short" onClick={e => handleChangeUrl(e, 'all')}>
            {translate.allProducts[lang]}
          </a>
        </li>}
        {data.length && data.map((item, index) => {
          if(!articles) {
            return <li key={index} className={`sub_menu_item${router.query.category === item._id ? ' active_sub' : ''}`}>
              <a href="#" onClick={e => handleChangeUrl(e, item._id)}>
                {item.title}
              </a>
            </li>
          }else{
            return <li key={index} className="sub_menu_item">
              <Link href={`/clanek/${router.query.category}/${item.slug.current}`}>
                <a>{item.title}</a>
              </Link>
            </li>
          }
        })}
      </ul>
    </nav>
  )
}

export default SubMenu;
