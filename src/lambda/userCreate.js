// userCreate.js
import mongoose from 'mongoose'
// Load the server
import db from './server'
// Load the User Model
import User from './models/user.model'


exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const {email, password, phone, name, surname, country, city, address, code} = JSON.parse(event.body),
          user = { _id: mongoose.Types.ObjectId(), email, password, phone, name, surname, country, city, address, code };

    const userData = await User.create(user)
    const response = {
      msg: "User successfully created",
      data: userData
    }

    return {
      statusCode: 201,
      body: JSON.stringify(response)
    }
  } catch (err) {
    console.log('user.create', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}
