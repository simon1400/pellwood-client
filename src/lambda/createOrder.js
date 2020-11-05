// createOrder.js
import mongoose from 'mongoose'
// Load the server
import db from './server'
// Load the Order Model
import Order from './models/order.model'
import axios from 'axios'

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const {note, currency, user, basket, payment, delivery, sum, idOrder, status} = JSON.parse(event.body),
          order = {
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
            note,
            basket,
            sum,
            idOrder: Math.floor(Math.random() * (999999 - 0)) + 0,
            status,
            paymentMethod: payment.value,
            paymentPrice: payment.price,
            deliveryMethod: delivery.value,
            deliveryPrice: delivery.price
          };

    const orderData = await Order.create(order)

    const paymentData = {
      merchant: 147005,
      test: true,
      price: sum * 100,
      curr: currency == 'Kč' ? 'CZK' : 'EUR',
      label: encodeURIComponent(user.name) + '-' + encodeURIComponent(user.surname),
      refId: order.idOrder,
      cat: 'DIGITAL',
      method: 'ALL',
      prepareOnly: true,
      email: user.email,
      secret: 'MBfhNsBL5v2DaKIhUnVsipeHyHwfoYhY'
    }

    var paymentReq = ''

    for (const [key, value] of Object.entries(paymentData)) {
      if(!paymentReq.length){
        paymentReq += `${key}=${value}`
      }else{
        paymentReq += `&${key}=${value}`
      }
    }

    var resPayment = await axios.post(`https://payments.comgate.cz/v1.0/create?${paymentReq}`)

    const resData = resPayment.data.split('&')
    const resDataParse = {}
    resData.forEach(item => {
      var itemSpliting = item.split('=');
      resDataParse[itemSpliting[0]] = itemSpliting[1]
    })

    const response = {
      msg: "Order successfully created",
      data: resDataParse
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (err) {
    console.log('order.create', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}
