import Link from 'next/link'
import translate from '../../data/staticTranslate'
import localize from '../../data/localize'
import { useRouter } from 'next/router'

const Body = ({
  deleteItem,
  handleChange,
  changeCount,
  basket
}) => {

  const router = useRouter()
  const {lang, currency} = localize(router.locale)

  return (
    <div className="tm-basket-body">
      <table className="uk-table uk-table-divider uk-table-middle">
        <thead>
          <tr>
            <th>{translate.item[lang]}</th>
            <th>{translate.quantity[lang]}</th>
            <th>{translate.price[lang]}</th>
          </tr>
        </thead>
        <tbody>

        {basket.map((item, index) => <tr key={index}>
            <td>
              <div className="tm-basket-item">
                <div data-src={item.imgUrl} className="tm-basket-img-wrap uk-background-contain" uk-img=""></div>
                <div className="tm-basket-item-info">
                  <h3 className="tm-basket-item-head">{item.nameProduct}</h3>
                  {item.variantName === item.nameProduct ? '' : <span>{item.variantName}</span>}
                  <div className="tm-remove-item">
                    <Link href={router.asPath +'?delete'+item.variantName.replace(/ /g, "_")} onClick={e => deleteItem(e, index)}>
                      <a><button uk-close=""></button>{translate.remove[lang]}</a>
                    </Link>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div className="custom_number quantity">
                <input type="number" min="1" max="1000" step="1" value={item.countVariant} onChange={(e) => handleChange(index, e.target.value)} />
                <div className="quantity-nav">
                  <div className="quantity-button quantity-up" onClick={() => changeCount(index, 'up')}>+</div>
                  <div className="quantity-button quantity-down" onClick={() => changeCount(index, 'down')}>-</div>
                </div>
              </div>
            </td>
            <td><span className="basket-body-price">{item.variantPrice instanceof String ? item.variantPrice : item.variantPrice+' '+currency}</span></td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Body
