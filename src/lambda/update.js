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

      const data = JSON.parse(event.body),
            id = data.id;

      // Use User.Model and id to update
      await User.findOneAndUpdate({_id: id}, data)
      const resData = await User.findById(id)

      let response = {
        msg: "User successfully updated",
        data: resData
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
