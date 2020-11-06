import React from 'react'
import times from '../../assets/times.svg'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import translate from '../../data/staticTranslate'

const ModalFilter = ({
  setSearch,
  search,
  stateRange,
  lang,
  rangeNumber,
  closeModal,
  handleFilter,
  setStateRange
}) => {

  return(
    <div id="modal-filter" className="uk-flex-top" uk-modal="">
      <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">

        <div className="tm-canvas-head">
          <h2>{translate.searchAndFilter[lang]}</h2>
          <button className="tm-canvas-close uk-close-large" type="button" uk-close="" onClick={() => closeModal()}></button>
        </div>

        <div className="login_form">
          <form onSubmit={(e) => handleFilter(e)}>

            <div className="search_wrap">
              <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="search" className="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z"></path></svg>
              <label><input className="effect-9 search_input" type="text" placeholder={`${translate.search[lang]}...`} value={search} onChange={e => setSearch(e.target.value)} /></label>
              {!!search.length && <img src={times} onClick={() => setSearch('')} alt="clear" />}
            </div>

            <div className="range-wrap">
              <div className="range-info">
                <span className="name-range">{translate.lengthPalicek[lang]}</span>
                <span className="value-range">{stateRange.length.min} - {stateRange.length.max} mm</span>
              </div>
              <InputRange
                maxValue={rangeNumber.length.max}
                minValue={rangeNumber.length.min}
                formatLabel={() => ''}
                value={stateRange.length}
                onChange={value => setStateRange({...stateRange, length: value})} />
            </div>


            <div className="range-wrap">
              <div className="range-info">
                <span className="name-range">{translate.weightPalicek[lang]}</span>
                <span className="value-range">{stateRange.diameter.min} - {stateRange.diameter.max} mm</span>
              </div>
              <InputRange
                maxValue={rangeNumber.diameter.max}
                minValue={rangeNumber.diameter.min}
                formatLabel={() => ''}
                value={stateRange.diameter}
                onChange={value => setStateRange({...stateRange, diameter: value})} />
            </div>


            <button type="submit" className="tm-button tm-black-button uk-width-1-1">Zobrazit výsledky</button>

          </form>
        </div>

      </div>
    </div>
  )
}

export default ModalFilter
