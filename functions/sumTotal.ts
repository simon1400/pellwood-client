export interface BasketItem {
  variantPrice: number | string;
  countVariant: number | string;
  [key: string]: any;
}

const sumTotal = (
  delivery: string | number | undefined | null,
  payment: string | number | undefined | null,
  basket: BasketItem[],
  setSumBefore: (val: number | string) => void,
  setSale: (val: number | string) => void,
  setSum: (val: number | string) => void,
  lang: 'cz' | 'en'
) => {
  // 1. Calculate raw sum of all items
  let sumAll = basket.reduce((total, item) => {
    const price = Number(item.variantPrice) || 0;
    const count = Number(item.countVariant) || 0;
    return total + (price * count);
  }, 0);

  // 2. Apply 5% discount if threshold met
  const discountThreshold = lang === 'cz' ? 2000 : 150;
  if (sumAll > discountThreshold) {
    const saleAmount = sumAll * 0.05;
    if (lang === 'en') {
      setSale(saleAmount.toFixed(2));
    } else {
      setSale(Math.round(saleAmount));
    }
    sumAll -= saleAmount;
  } else {
    setSale(0);
  }

  // 3. Set the total sum of items AFTER discount but BEFORE shipping/payment
  if (lang === 'en') {
    setSumBefore(Number(sumAll.toFixed(2)));
  } else {
    setSumBefore(Math.round(sumAll));
  }

  // 4. Add delivery cost (if below free delivery threshold)
  const deliveryThreshold = lang === 'cz' ? 1500 : 100;
  if (sumAll <= deliveryThreshold && delivery) {
    sumAll += parseInt(String(delivery)) || 0;
  }

  // 5. Add payment cost
  if (payment) {
    sumAll += parseInt(String(payment)) || 0;
  }

  // 6. Set final grand total
  if (lang === 'en') {
    setSum(sumAll.toFixed(2));
  } else {
    setSum(Math.round(sumAll));
  }
};

export default sumTotal;
