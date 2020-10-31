import React, {useState, useEffect} from 'react'
import sanityClient from "../../lib/sanity.js";
import mastercard from '../assets/mastercard.svg'
import visa from '../assets/visa.svg'
import BlockContent from "@sanity/block-content-to-react";
import hardart from '../assets/hardart.svg'

import localize from '../data/localize'
const {lang} = localize(window.location.href)


const query = `*[_type == "settings"].${lang}.footer`;

export default () => {

  const [footer, setFooter] = useState([])

  useEffect(() => {
    sanityClient.fetch(query).then(data => {
      setFooter(data[0])
    })
  }, [])

  return (
    <footer>
      <div className="uk-container uk-container-expand uk-height-1-1">
        <div className="uk-flex uk-flex-between uk-flex-middle uk-height-1-1 uk-flex-wrap" uk-height-match="target: > .footer-item">
          <div className="cart_method_foot uk-flex uk-flex-left">
            <div>
              <img src={mastercard} alt="Mastercard" />
            </div>
            <div>
              <img src={visa} alt="Visa" />
            </div>
          </div>
          {footer?.length && footer.map(item =>
            <div key={item._key} className="footer-item">
              <h4 className="footer-item-head">{item.title}</h4>
              <BlockContent blocks={item.content} />
            </div>
          )}
        </div>
      </div>
      <div className="copyright">
        <span>Made in Brno by</span>
        <a href="mailto:danielkokes@gmail.com"><img src={hardart} alt="Hardart studio"/></a>
      </div>
    </footer>
  )
}
