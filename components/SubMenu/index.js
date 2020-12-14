import {useState, useEffect} from 'react';
import Link from "next/link";
import translate from '../../data/staticTranslate'
import { useRouter } from 'next/router'
import localize from '../../data/localize'

const SubMenu = ({data, articles = false}) => {

  const router = useRouter()
  const {lang} = localize(router.locale)
  const [baseUrl, setBaseUrl] = useState('')

  useEffect(() => {
    setBaseUrl(router.asPath.split('/')[1])
  }, [])


  return(
    <nav className="sub_menu">
      <ul>
        {baseUrl === 'produkty' && <li uk-filter-control="" className="sub_menu_item">
          <a href="#catalog-short">
            {translate.allProducts[lang]}
          </a>
        </li>}
        {data.length && data.map((item, index) => {
          if(!articles) {
            return <li key={index} className="sub_menu_item" uk-filter-control={`[data-category='${item._id}']`}>
              <a href="#">
                {item[lang].title}
              </a>
            </li>
          }else{
            return <li key={index} className="sub_menu_item">
              <Link href={`/clanek/${baseUrl}/${item.slug.current}`}>
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
