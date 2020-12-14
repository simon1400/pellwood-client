import translate from '../data/staticTranslate'

export default (data) => {

  const tax = data.sum * 0.21
  const sumWithoutTax = data.sum - tax

  const dataSend = {
    transaction_id: data.idOrder,
    affiliation: "Pellwood",
    value: sumWithoutTax,
    currency: data.currency === 'Kč' ? 'CZK' : 'EUR',
    tax: tax,
    shipping: data.deliveryPrice === translate.free[data.currency === 'Kč' ? 'cz' : 'en'] ? 0 : parseInt(data.deliveryPrice),
    items: data.basket.map((item, index) => ({
      id: item.id,
      name: item.nameProduct,
      brand: "Pellwood",
      variant: item.variantName,
      list_position: index + 1,
      quantity: item.countVariant,
      price: item.variantPrice
    }))
  }

  return dataSend
}
