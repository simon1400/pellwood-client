// usersRead.js
import mongoose from 'mongoose'
// Load the server
import db from './server'
// Load the User Model
import User from './models/user.model'

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {

    // Use User.Model to create a new user
    const users = await User.find()

    const response = {
      msg: "User successfully created",
      data: users
    }

    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
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
