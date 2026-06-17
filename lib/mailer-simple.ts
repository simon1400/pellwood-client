import nodemailer from 'nodemailer';

export async function createTransporter() {
  // Create transporter without connection checks (useful for quick serverless testing)
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'hardart.cz@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD || process.env.GOOGLE_REFRESH,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 60000,
    greetingTimeout: 30000,
    socketTimeout: 60000,
  });

  return transporter;
}
