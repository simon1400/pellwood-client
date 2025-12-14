import mongoose from 'mongoose';
import axios from 'axios';
import dbConnect from '../../../lib/dbConnect';
import Order from '../../../models/order.model';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const orderData = await Order.find({}).sort({ _id: -1 });

        const response = {
          msg: "Order successfully getting",
          data: orderData
        };

        res.status(200).json(response);
      } catch (err) {
        console.log('Order getting', err);
        res.status(500).json({ msg: err.message });
      }
      break;

    case 'POST':
      console.log('POST /api/order');

      try {
        const { note, currency, user, basket, payment, delivery, sum, idOrder, status } = req.body;
        const order = {
          _id: mongoose.Types.ObjectId(),
          email: user.email,
          phone: user.phone,
          name: user.name,
          surname: user.surname,
          country: user.country,
          city: user.city,
          address: user.address,
          code: user.code,
          anotherAdress: user.anotherAdress,
          companyData: user.companyData,
          anotherAddressCheck: user.anotherAddressCheck,
          companyDataCheck: user.companyDataCheck,
          currency,
          note,
          basket,
          sum,
          idOrder: Math.floor(Math.random() * (999999 - 0)) + 0,
          status,
          state: 'new',
          paymentMethod: payment.value,
          paymentPrice: payment.price,
          payOnline: payment.payOnline,
          deliveryMethod: delivery.value,
          deliveryPrice: delivery.price
        };

        const resDataParse = {};

        if (payment.payOnline) {
          const paymentData = {
            merchant: 147005,
            price: Math.floor(sum * 100),
            lang: currency == 'Kč' ? 'cs' : 'en',
            curr: currency == 'Kč' ? 'CZK' : 'EUR',
            label: encodeURIComponent(user.name) + '-' + encodeURIComponent(user.surname),
            refId: order.idOrder,
            cat: 'DIGITAL',
            method: 'ALL',
            prepareOnly: true,
            email: encodeURIComponent(user.email),
            secret: 'MBfhNsBL5v2DaKIhUnVsipeHyHwfoYhY'
          };

          let paymentReq = '';

          for (const [key, value] of Object.entries(paymentData)) {
            if (!paymentReq.length) {
              paymentReq += `${key}=${value}`;
            } else {
              paymentReq += `&${key}=${value}`;
            }
          }

          const resPayment = await axios.post(`https://payments.comgate.cz/v1.0/create?${paymentReq}`);

          const resData = resPayment.data.split('&');
          resData.forEach(item => {
            const itemSpliting = item.split('=');
            resDataParse[itemSpliting[0]] = itemSpliting[1];
          });
        }

        const resOrder = await Order.create(order);

        const zboziConverseBody = {
          PRIVATE_KEY: "W9CQNC9gPMhvp4gQmyrj1XEmjnUuNFph",
          sandbox: false,
          orderId: order.idOrder,
          email: order.email,
          deliveryType: 'PPL',
          deliveryPrice: order.deliveryPrice === 'ZDARMA' ? 0 : +order.deliveryPrice.split(' ')[0],
          paymentType: order.paymentMethod,
          otherCosts: order.paymentPrice === 'ZDARMA' ? 0 : +order.paymentPrice.split(' ')[0],
          cart: basket.map((item) => ({
            itemId: item.id,
            productName: `${item.nameProduct}${item.variantName ? ' - ' + item.variantName : ''}`,
            unitPrice: +item.variantPrice,
            quantity: item.countVariant
          }))
        };

        await axios.post(`https://www.zbozi.cz/action/${153477}/conversion/backend`, zboziConverseBody)
          .catch(err => console.log('ERROR', err.response?.data?.problemTypes));

        const response = {
          msg: "Order successfully created",
          data: payment.payOnline ? resDataParse : resOrder
        };

        res.status(200).json(response);
      } catch (err) {
        console.log('order.create', err);
        res.status(500).json({ msg: err.message });
      }
      break;

    case 'PUT':
      console.log('UPDATE /api/order');

      try {
        const { _id, state } = req.body;
        const order = await Order.updateOne({ _id }, { state }, { upsert: true });

        res.status(200).json(order);
      } catch (err) {
        console.log('Order update ---', err);
        res.status(500).json({ msg: err.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
