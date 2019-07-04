// login.js
import mongoose from 'mongoose'
// Load the server
import db from './server'
// Load the User Model
import User from './models/user.model'

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

    const {email, password} = JSON.parse(event.body)

    const user = await User.findOne({email: email, password: password})

    if(user){
      const response = {
        msg: "User successfully found",
        error: false,
        data: user
      }
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    }else{
      return {
        statusCode: 500,
        body: JSON.stringify({msg: 'error', error: true})
      }
    }
}
