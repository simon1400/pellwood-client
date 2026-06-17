import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const { OAuth2 } = google.auth;

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const GOOGLE_ID = process.env.GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;
const GOOGLE_REFRESH = process.env.GOOGLE_REFRESH;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

export async function createTransporter() {
  try {
    // If Gmail App Password is set, use simple auth (more reliable)
    if (GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // use TLS
        auth: {
          user: 'hardart.cz@gmail.com',
          pass: GMAIL_APP_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      return transporter;
    }
    
    // Fallback to OAuth2
    const oauth2Client = new OAuth2(
      GOOGLE_ID,
      GOOGLE_SECRET,
      OAUTH_PLAYGROUND
    );

    oauth2Client.setCredentials({
      refresh_token: GOOGLE_REFRESH,
    });

    const accessTokenResponse = await oauth2Client.getAccessToken();
    const accessToken = accessTokenResponse.token;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'hardart.cz@gmail.com',
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: GOOGLE_REFRESH as string,
        accessToken: accessToken as string,
      },
      pool: true,
      maxConnections: 1,
    } as any); // Type cast due to strict Nodemailer OAuth2 typings

    return transporter;
  } catch (error: any) {
    console.error('Error creating transporter:', error.message || error);
    throw error;
  }
}
