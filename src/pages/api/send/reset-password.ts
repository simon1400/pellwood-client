import type { NextApiRequest, NextApiResponse } from "next";
import { createTransporter } from "@/lib/mailer";
import { sendEmail as sendEmailViaResend } from "@/lib/mailer-resend";
import { sendEmail as sendEmailViaSendGrid } from "@/lib/mailer-sendgrid";
import ResetPassword from "@/mail_template/resetPassword";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    const { email } = req.body;

    const mailOptions = {
      from: '"Obnoveni hesla - Pellwood" <info@pellwood.cz>',
      to: email,
      subject: "Obnoveni hesla",
      text: "Obnoveni hesla - Pellwood",
      html: ResetPassword(email),
    };

    // Standardized mailer fallback logic mirroring orderInfo
    if (process.env.RESEND_API_KEY) {
      await sendEmailViaResend(mailOptions);
    } else if (process.env.SENDGRID_API_KEY) {
      await sendEmailViaSendGrid(mailOptions);
    } else {
      const transporter = await createTransporter();
      await transporter.sendMail(mailOptions);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("mail.send error:", err);
    return res.status(500).json({
      msg: err instanceof Error ? err.message : "Internal Server Error",
      success: false,
    });
  }
}
