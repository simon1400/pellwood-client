// sendMail.js
import mongoose from 'mongoose'
import nodemailer from 'nodemailer'
// Load the server
import db from './server'

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const {subject, email, body} = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'pechunka04@gmail.com',
        pass: 'd04101996d'
      }
    });

    let mailOptions = {
      from: '"Заявка с сайта"',
      to: email, // list of receivers
      subject: subject, // Subject line
      text: body, // plain text body
      html: body // html body
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return {
          statusCode: 400,
          body: JSON.stringify({success: false})
        }
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({success: true})
    }


  } catch (err) {
    console.log('mail.send', err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  }
}
