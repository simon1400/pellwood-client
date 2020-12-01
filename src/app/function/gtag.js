import translate from '../data/staticTranslate'

export default (data) => {

  const order = data[0]
  const tax = order.sum * 0.21
  const sumWithoutTax = order.sum - tax

  const dataSend = {
    transaction_id: order.idOrder,
    affiliation: "Pellwood",
    value: sumWithoutTax,
    currency: order.currency === 'Kč' ? 'CZK' : 'EUR',
    tax: tax,
    shipping: order.deliveryPrice === translate.free[order.currency === 'Kč' ? 'cz' : 'en'] ? 0 : parseInt(order.deliveryPrice),
    items: order.basket.map((item, index) => ({
      id: item.id,
      name: item.nameProduct,
      brand: "Pellwood",
      variant: item.variantName,
      list_position: index + 1,
      quantity: item.countVariant,
      price: item.variantPrice
    }))
  }

  window.gtag('event', 'purchase', dataSend);

  return
}
