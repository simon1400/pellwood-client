// getInfoPayment.js
import mongoose from 'mongoose'
// Load the server
// import db from './server'
import axios from 'axios'
// Load the Order Model
// import Order from './models/order.model'


exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
   

    console.log('body -- ', event);
    //
    // var paymentReq = ''
    //
    // for (const [key, value] of Object.entries(body)) {
    //   if(!paymentReq.length){
    //     paymentReq += `${key}=${value}`
    //   }else{
    //     paymentReq += `&${key}=${value}`
    //   }
    // }

    // var resPayment = await axios.post(`https://payments.comgate.cz/v1.0/create?${paymentReq}`)

    // const resData = resPayment.data.split('&')
    // const resDataParse = {}
    // resData.forEach(item => {
    //   var itemSpliting = item.split('=');
    //   resDataParse[itemSpliting[0]] = itemSpliting[1]
    // })
    //
    // console.log('resDataParse -- ', resDataParse);

    // const orderData = await Order.create(order)
    const response = {
      msg: "Payments successfully getting",
      data: {}
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
