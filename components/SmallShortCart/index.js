import { useState, useEffect } from "react";
import Cart from "../Cart";
import translate from "../../data/staticTranslate";

const ShortBlock = ({ data, lang, currency }) => {
  const [desktop, setDesktop] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth > 960) setDesktop(true);
      else setDesktop(false);
    }
  }, []);

  return (
    <section className="grey section_base slider-card">
      <div className="uk-container uk-container-expand">
        <div className="uk-grid uk-child-width-1-1 uk-grid-stack" uk-grid="">
          <div>
            <h2
              className="section_head"
              uk-scrollspy="cls: uk-animation-slide-top-small; delay: 500"
            >
              {translate.interestedproducts[lang]}
            </h2>
          </div>
        </div>
        {!desktop && (
          <div>
            <div
              className="uk-position-relative uk-visible-toggle uk-light"
              tabIndex="-1"
              uk-slider="center: true;"
            >
              <ul
                className="uk-slider-items uk-grid uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m"
                uk-scrollspy="target: > li > a; cls: uk-animation-slide-top-small; delay: 500"
              >
                {(data || []).map((item, index) => (
                  <Cart
                    key={index}
                    item={item}
                    lang={lang}
                    currency={currency}
                  />
                ))}
              </ul>
              <ul className="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
            </div>
          </div>
        )}
        {desktop && (
          <div
            className="uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m uk-grid uk-grid-stack"
            uk-grid=""
          >
            {(data || []).map((item, index) => (
              <Cart
                key={index}
                item={item}
                lang={lang}
                currency={currency}
                block={true}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShortBlock;
