// getStatusPayment.js
import mongoose from 'mongoose'
// Load the server
import db from './server'
import axios from 'axios'



exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const eventNajky = JSON.parse(event)

    const paymentData = {
      merchant: '147005',
      transId: id,
      secret: 'MBfhNsBL5v2DaKIhUnVsipeHyHwfoYhY'
    }

    console.log(eventNajky);

    // var paymentReq = ''
    //
    // for (const [key, value] of Object.entries(paymentData)) {
    //   if(!paymentReq.length){
    //     paymentReq += `${key}=${value}`
    //   }else{
    //     paymentReq += `&${key}=${value}`
    //   }
    // }
    //
    // var resPayment = await axios.post(`https://payments.comgate.cz/v1.0/status?${paymentReq}`)
    //
    // const resData = resPayment.data.split('&')
    // const resDataParse = {}
    // resData.forEach(item => {
    //   var itemSpliting = item.split('=');
    //   resDataParse[itemSpliting[0]] = itemSpliting[1]
    // })

    // const orderData = await Order.create(order)
    const response = {
      msg: "Order successfully created",
      data: eventNajky
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
