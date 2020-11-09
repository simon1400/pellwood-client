// sendMail.js
import mongoose from 'mongoose'
import nodemailer from 'nodemailer'
import InfoOrder from './mail_template/infoOrder.js'
// Load the server
import db from './server'

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  try {
    const data = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
      service: "gmail.com",
      auth: {
        user: 'pechunka04@gmail.com',
        pass: 'd04101996d'
      }
    });

    let mailOptions = {
      from: '"Objednávka dokončena - Pellwood" <info@pellwood.cz>',
      to: data.email, // list of receivers
      subject: 'Objednávka č.: ' + data.idOrder, // Subject line
      text: "Objednávka dokončena - Pellwood", // plain text body
      html: InfoOrder(data) // html body
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
