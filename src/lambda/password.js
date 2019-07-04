// login.js
import mongoose from 'mongoose'
// Load the server
import db from './server'
// Load the User Model
import User from './models/user.model'

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

    const {oldPassword, newPassword, email} = JSON.parse(event.body)

    let user = await User.findOneAndUpdate({email: email, password: oldPassword}, {password: newPassword})

    if(user){
      const response = {
        msg: "User successfully found",
        error: false
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
