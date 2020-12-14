import translate from '../data/staticTranslate'

const sumTotal = (delivery, payment, basket, setSumBefore, setSale, setSum, lang) => {
  var sumAll = 0, sumItem = 0;
  var newBasket = basket
  newBasket.map((item, index) => {

    if(item.variantPrice instanceof String)sumItem = +item.variantPrice * item.countVariant
    else sumItem = item.variantPrice * item.countVariant

    sumAll = +sumItem + sumAll
  })

  let sumItemsBefore = sumAll
  setSumBefore(sumItemsBefore)

  if(lang === 'en' && sumAll > 150) setSale((Math.round(sumAll * 0.05 * 100) / 100).toFixed(2))
  else if(lang === 'cz' && sumAll > 2000) setSale(Math.round(sumAll * 0.05))

  if(lang === 'cz' && sumAll > 2000 || lang === 'en' && sumAll > 150){
    setSumBefore(Math.round(sumAll - (sumAll * 0.05)))
    sumAll = sumAll - (sumAll * 0.05)
  }

  if(lang === 'en' && sumAll <= 150 || lang === 'cz' && sumAll <= 2000) setSale(0)

  if(delivery || payment){
    if(delivery !== translate.free[lang] && ((lang === 'en' && sumAll <= 100) || (lang === 'cz' && sumAll <= 1500))) sumAll = +sumAll + +delivery.split(' ')[0]
    if(payment !== translate.free[lang]) sumAll = +sumAll + +payment.split(' ')[0]
  }

  if(lang === 'en') setSum((Math.round(sumAll * 100) / 100).toFixed(2))
  else setSum(Math.round(sumAll))
}

export default sumTotal
