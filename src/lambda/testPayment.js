// testPayment.js
import mongoose from 'mongoose'
// Load the server
// import db from './server'
import axios from 'axios'
// Load the Order Model
// import Order from './models/order.model'


exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const {note, user, basket, payment, delivery, sum, idOrder, status, currency} = JSON.parse(event.body)

    const paymentData = {
      merchant: process.env.PAYED_ID,
      test: true,
      price: sum * 100,
      curr: currency == 'Kč' ? 'CZK' : 'EUR',
      label: 'Testovaci label',
      refId: 2010102600,
      cat: 'DIGITAL',
      method: 'ALL',
      prepareOnly: true,
      email: user.email,
      secret: process.env.PAYED_PASSWORD
    }

    console.log('paymentData -- ', paymentData);

    var paymentReq = ''

    for (const [key, value] of Object.entries(paymentData)) {
      if(!paymentReq.length){
        paymentReq += `${key}=${value}`
      }else{
        paymentReq += `&${key}=${value}`
      }
    }

    var resPayment = await axios.post(`https://payments.comgate.cz/v1.0/create?${paymentReq}`)

    console.log('resPayment.data -- ', resPayment.data);
    const resData = resPayment.data.split('&')
    const resDataParse = {}
    resData.forEach(item => {
      var itemSpliting = item.split('=');
      resDataParse[itemSpliting[0]] = itemSpliting[1]
    })

    console.log('resDataParse -- ', resDataParse);

    // const orderData = await Order.create(order)
    const response = {
      msg: "Order successfully created",
      data: resDataParse
    }

    return {
      statusCode: 201,
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
