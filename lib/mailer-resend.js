import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export async function sendEmail(mailOptions) {
  try {
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set");
    }

    const resend = new Resend(RESEND_API_KEY);

    // Extract email from "Name <email@domain.com>" format
    const extractEmail = (emailString) => {
      const match = emailString.match(/<(.+)>/);
      return match ? match[1] : emailString;
    };

    // Parse from field
    const fromEmail = extractEmail(mailOptions.from);
    
    // Parse to field (может быть несколько адресов через запятую)
    const toEmails = mailOptions.to
      .split(",")
      .map(email => email.trim())
      .map(email => extractEmail(email));

    console.log("Sending email via Resend...");
    console.log("From:", fromEmail);
    console.log("To:", toEmails);

    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmails,
      subject: mailOptions.subject,
      html: mailOptions.html,
      text: mailOptions.text,
    });

    console.log("Email sent successfully via Resend");
    console.log("Result:", result);
    
    return { messageId: result.id };
  } catch (error) {
    console.error("Resend error:", error.message);
    if (error.response) {
      console.error("Resend response:", error.response);
    }
    throw error;
  }
}
