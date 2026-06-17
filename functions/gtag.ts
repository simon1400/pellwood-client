import type { OrderData } from '../src/types/shop';

export interface GtagItem {
  id: string;
  name: string;
  brand: string;
  variant: string;
  list_position: number;
  quantity: number;
  price: number;
}

export interface GtagPurchaseEvent {
  transaction_id: string;
  affiliation: string;
  value: number;
  currency: string;
  tax: number;
  shipping: number;
  items: GtagItem[];
}

const buildGtagPayload = (data: OrderData): GtagPurchaseEvent => {
  const sum = Number(data.sum) || 0;
  const tax = sum * 0.21;
  const sumWithoutTax = sum - tax;

  // Gracefully handles numbers and strings like "100 Kč", "ZDARMA", "FREE"
  const shipping = parseInt(String(data.deliveryPrice)) || 0;

  return {
    transaction_id: data.idOrder,
    affiliation: 'Pellwood',
    value: Number(sumWithoutTax.toFixed(2)),
    currency: data.currency === 'Kč' ? 'CZK' : 'EUR',
    tax: Number(tax.toFixed(2)),
    shipping,
    items: data.basket.map((item, index) => ({
      id: item.id || '',
      name: item.nameProduct || '',
      brand: 'Pellwood',
      variant: item.variantName || '',
      list_position: index + 1,
      quantity: Number(item.countVariant) || 1,
      price: Number(item.variantPrice) || 0
    }))
  };
};

export default buildGtagPayload;
