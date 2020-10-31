// getOrder.js
import mongoose from 'mongoose'
// Load the server
import db from './server'
// Load the Order Model
import Order from './models/order.model'


exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    if(event.httpMethod !== 'OPTIONS'){
      const {email} = JSON.parse(event.body);

      if(email === 'all'){
        var orderData = await Order.find({})
      }else{
        var orderData = await Order.find({email: email})
      }

      const response = {
        msg: "Order successfully created",
        data: orderData
      }

      return {
        statusCode: 201,
        headers: {
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "POST"
        },
        body: JSON.stringify(response)
      }
    }else{
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": '*',
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "OPTIONS"
        },
        body: JSON.stringify({})
      }
    }

  } catch (err) {
    console.log('order.create', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}
