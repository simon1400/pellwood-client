// login.js
import mongoose from 'mongoose'
// Load the server
import db from './server'
// Load the User Model
import User from './models/user.model'

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    if(event.httpMethod !== 'OPTIONS'){

      const {data, type} = JSON.parse(event.body)

      let userData

      if(type === 'update'){
        const id = data.id;
        await User.findOneAndUpdate({_id: id}, data)
        userData = await User.findById(id)
      }else if(type === 'create'){
        data._id = mongoose.Types.ObjectId()
        userData = await User.create(data)
      }

      let response = {
        msg: "User successfully",
        data: userData
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
        }
      }
    }

  } catch(err) {
    console.log('data.update', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}
