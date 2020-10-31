// getInfoPayment.js
import mongoose from 'mongoose'
// Load the server
import db from './server'
import axios from 'axios'
// Load the Order Model
import Order from './models/order.model'


exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false


  try {
    const body = event.body

    const resData = body.split('&')
    const resDataParse = {}
    resData.forEach(item => {
      var itemSpliting = item.split('=');
      resDataParse[itemSpliting[0]] = itemSpliting[1]
    })

    const orderData = await Order.findOneAndUpdate({idOrder: resDataParse.refId}, {status: resDataParse.status})
    const response = {
      msg: "Payments successfully getting",
      data: orderData
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
