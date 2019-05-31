import React from 'react';
import Page from '../../components/page';
import RandomArticles from '../../components/random-articles';
import ShortBlock from '../../components/small-short-cart';

import './style.scss'

export default () => {
  return (
    <Page id="product" title="Product">
    <section className="full product">
      <div className="uk-grid uk-child-width-1-1 uk-child-width-1-2@m" uk-grid="" uk-height-match="target: > div > div">
        <div>
          <div className="article_img_wrap">
            <div className="uk-visible@m">
              <img src="./img/product.jpg" alt="" />
            </div>
            <div className="uk-hidden@m">
              <img src="./img/product-horizontal.jpg" alt="" />
            </div>
          </div>
        </div>
        <div>
          <div className="content_wrap grey">
            <div className="content">
              <h1 className="head_1">2 B 30 Days Life</h1>
              <div className="variants_list">
                <div className="uk-grid uk-grid-medium" uk-grid="">
                  <div className="uk-width-expand">Hickory</div>
                  <div className="short_price">120 Kč</div>
                </div>
                <div className="uk-grid uk-grid-medium" uk-grid="">
                  <div className="uk-width-expand">Habr</div>
                  <div className="short_price">150 Kč</div>
                </div>
                <div className="uk-grid uk-grid-medium" uk-grid="">
                  <div className="uk-width-expand">Hickory nylon</div>
                  <div className="short_price">180 Kč</div>
                </div>
                <div className="uk-grid uk-grid-medium" uk-grid="">
                  <div className="uk-width-expand">Habr nylon</div>
                  <div className="short_price">250 Kč</div>
                </div>
              </div>
              <div className="order_block">
                <div className="uk-flex uk-flex-between">
                  <div>
                    <div className="uk-width-1-1 uk-width-auto@m">
                      <div className="custom-select-wrap">
                        <button className="custom-select -error uk-button uk-button-default" type="button" tabIndex="-1">
                          <span>Vybrat variantu</span>
                          <span><img src="/img/chevron-down-light.svg" alt="" /></span>
                        </button>
                        <div className="select_dropdown" uk-drop="mode: click">
                          <ul style={{height: 'calc(55px * 4 + 4px)'}}>
                            <li>
                              <a href="#" className="variant_select" title="seřadit podle cenys eřadit podle ceny">
                                <span className="uk-grid uk-grid-small">
                                  <span className="uk-width-3-5">Hickory</span>
                                  <span className="uk-width-2-5 uk-text-right">120 Kč</span>
                                </span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="custom_number quantity">
                      <input type="number" min="1" max="1000" step="1" value="1" />
                      <div className="quantity-nav">
                        <div className="quantity-button quantity-up">+</div>
                        <div className="quantity-button quantity-down">-</div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="button black" href="/">PŘIDAT DO KOŠÍKU</button>
              </div>
              <div className="description_product">
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce suscipit libero eget elit. Curabitur vitae diam non enim vestibulum interdum. Nullam lectus justo, vulputate eget mollis sed, tempor sed magna.</p>
              </div>
              <div className="paramets">
                <table className="uk-table uk-table-divider uk-table-small">
                  <tbody>
                    <tr>
                      <td>Délka</td>
                      <td className="uk-text-right">420 mm</td>
                    </tr>
                    <tr>
                      <td>Průměr</td>
                      <td className="uk-text-right">16 mm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ShortBlock />
    <RandomArticles />

    </Page>
  )
}
