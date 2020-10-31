// sendMail.js
import mongoose from 'mongoose'
// Load the server
import Registration from './mail_template/registration.js'
import accessToken from './functions/auth.js'
import nodemailer from 'nodemailer'
import encoding from 'encoding'
const dotenv = require('dotenv').config()

exports.handler = (event, context, callback) => {

	const {email} = JSON.parse(event.body)

	let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_ROOT,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken
    }
  });

  transporter.sendMail({
    from: '"Pellwood" <'+process.env.EMAIL_ROOT+'>',
    to: email,
    subject: 'Registrace',
    text: 'Registrace na strance',
		html: Registration()
  }, function(error, info) {
  	if (error) {
  		callback(error);
  	} else {
  		console.log('send email to user');
  	}
  });


	callback(null, {
		statusCode: 200,
		body: "Ok"
	});
}
