import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

export async function sendEmail(mailOptions) {
  try {
    if (!SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY is not set');
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    const msg = {
      to: mailOptions.to,
      from: mailOptions.from.includes('<') 
        ? mailOptions.from.match(/<(.+)>/)[1] 
        : mailOptions.from,
      subject: mailOptions.subject,
      text: mailOptions.text,
      html: mailOptions.html,
    };

    console.log('Sending email via SendGrid...');
    const result = await sgMail.send(msg);
    console.log('Email sent successfully via SendGrid');
    
    return { messageId: result[0].headers['x-message-id'] };
  } catch (error) {
    console.error('SendGrid error:', error.message);
    if (error.response) {
      console.error('SendGrid response:', error.response.body);
    }
    throw error;
  }
}
