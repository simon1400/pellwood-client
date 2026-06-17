import sgMail, { MailDataRequired } from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

export interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

export async function sendEmail(mailOptions: MailOptions) {
  try {
    if (!SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY is not set');
    }

    if (!mailOptions.html && !mailOptions.text) {
      throw new Error("Either html or text must be provided to send an email via SendGrid");
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    const extractEmail = (emailString: string): string => {
      const match = emailString.match(/<(.+)>/);
      return match ? match[1] : emailString;
    };

    const msg = {
      to: mailOptions.to,
      from: mailOptions.from.includes('<') 
        ? extractEmail(mailOptions.from)
        : mailOptions.from,
      subject: mailOptions.subject,
    } as MailDataRequired;

    if (mailOptions.html) msg.html = mailOptions.html;
    if (mailOptions.text) msg.text = mailOptions.text;

    const result = await sgMail.send(msg);
    
    return { messageId: result[0]?.headers['x-message-id'] || 'unknown' };
  } catch (error: any) {
    console.error('SendGrid error:', error.message || error);
    if (error.response) {
      console.error('SendGrid response:', error.response.body);
    }
    throw error;
  }
}
