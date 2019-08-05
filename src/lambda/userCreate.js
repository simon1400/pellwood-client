// userCreate.js
import mongoose from 'mongoose'
// Load the server
import db from './server'
// Load the User Model
import User from './models/user.model'


exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const {email, password} = JSON.parse(event.body),
          user = { _id: mongoose.Types.ObjectId(), email, password };


    let emptyInput = []
    let response = {}
    Object.keys(user).map((key, index) => {
      if(!user[key].length && key !== '_id'){
        emptyInput.push(String(key))
      }
    });

    const existUser = await User.findOne({email: user.email})
    if(emptyInput.length){
      response = {
        msg: "Empty input",
        error: emptyInput
      }
    }else if(existUser){
      response = {
        msg: "User now exist",
        error: "email"
      }
    }else{
      const userData = await User.create(user)
      response = {
        msg: "User successfully created",
        data: userData
      }
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
