// createOrder.js
import mongoose from 'mongoose'
// Load the server
import db from './server'
// Load the Order Model
import Order from './models/order.model'


exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const {note, user, basket, payment, delivery, sum} = JSON.parse(event.body),
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
            paymentMethod: payment.value,
            paymentPrice: payment.price,
            deliveryMethod: delivery.value,
            deliveryPrice: delivery.price
          };

    const orderData = await Order.create(order)
    const response = {
      msg: "Order successfully created",
      data: orderData
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
