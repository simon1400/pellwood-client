import { google } from 'googleapis'

const dotenv = require('dotenv').config()

export default async () => {
  const OAuth2 = google.auth.OAuth2;

  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  );

  await oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

  const accessToken = await oauth2Client.getAccessToken()

  return accessToken
}
