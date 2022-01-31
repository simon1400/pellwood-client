import {useState, useEffect} from 'react'
import sanityClient from "../lib/sanity.js";
import BlockContent from "@sanity/block-content-to-react";
import { useRouter } from 'next/router'
import localize from '../data/localize'

export default () => {

  const router = useRouter()
  const {lang} = localize(router.locale)
  const query = `*[_type == "settings"].${lang}.footer`;
  const [footer, setFooter] = useState([])

  useEffect(() => {
    sanityClient.fetch(query).then(data => {
      setFooter(data[0])
    })
  }, [])

  const handleCookies = (e) => {
    e.preventDefault()
    const cc = window.initCookieConsent();
    cc.showSettings(200)
  }

  return (
    <footer>
      <div className="uk-container uk-container-expand uk-height-1-1">
        <div className="uk-flex uk-flex-between uk-flex-middle uk-height-1-1 uk-flex-wrap" uk-height-match="target: > .footer-item">
          <div className="cart_method_foot uk-flex uk-flex-left">
            <div>
              <img src="/assets/mastercard.svg" width="100%" height="28" alt="Mastercard" />
            </div>
            <div>
              <img src="/assets/visa.svg" width="100%" height="28" alt="Visa" />
            </div>
          </div>
          {footer?.length && footer.map((item, index) =>
            <div key={item._key} className="footer-item">
              <h4 className="footer-item-head">{item.title}</h4>
              <BlockContent blocks={item.content} />
              {index === 2 && <a onClick={(e) => handleCookies(e)} href="/">Nastavení cookies</a>}
            </div>
          )}
        </div>
      </div>
      <div className="copyright">
        <span>Made in Brno by </span>
        <a href="mailto:danielkokes@gmail.com,dmytro@pechunka.com"><img src="/assets/hardart.svg" height="18" width="100%" alt="Hardart studio"/></a>
      </div>
    </footer>
  )
}
