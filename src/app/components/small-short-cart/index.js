import React from 'react';
import Cart from '../cart'

const ShortBlock = ({data, currency}) => {

  return(
    <section className="grey section_base slider-card">
      <div className="uk-container uk-container-expand">
        <div className="uk-grid uk-child-width-1-1" uk-grid="">
          <div>
            <h2 className="section_head" uk-scrollspy="cls: uk-animation-slide-top-small; delay: 500">Mohlo by vás zajímat</h2>
          </div>
        </div>
        <div>
          <div className="uk-position-relative uk-visible-toggle uk-light" tabIndex="-1" uk-slider="center: true;">
            <ul className="uk-slider-items uk-grid uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m" uk-scrollspy="target: > li > a; cls: uk-animation-slide-top-small; delay: 500">
              {(data || []).map((item, index) => <Cart key={index} item={item} currency={currency}/>)}
            </ul>
            <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
          </div>

        </div>
      </div>
    </section>
  )
}


export default ShortBlock
