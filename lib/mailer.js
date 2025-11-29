import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const { OAuth2 } = google.auth;

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const GOOGLE_ID = process.env.GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET;
const GOOGLE_REFRESH = process.env.GOOGLE_REFRESH;

const oauth2Client = new OAuth2(
  GOOGLE_ID,
  GOOGLE_SECRET,
  OAUTH_PLAYGROUND
);

oauth2Client.setCredentials({
  refresh_token: GOOGLE_REFRESH,
});

export async function createTransporter() {
  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'hardart.cz@gmail.com',
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
      refreshToken: GOOGLE_REFRESH,
      accessToken,
    },
  });

  return transporter;
}
