import { createTransporter } from '../../../lib/mailer';
import ResetPassword from '../../../mail_template/resetPassword';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    console.log('POST /api/send/reset-password');

    try {
      const { email } = req.body;

      const transporter = await createTransporter();

      const mailOptions = {
        from: '"Obnoveni hesla - Pellwood" <info@pellwood.cz>',
        to: email,
        subject: 'Obnoveni hesla',
        text: "Obnoveni hesla - Pellwood",
        html: ResetPassword(email)
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ success: true });
    } catch (err) {
      console.log('mail.send', err);
      res.status(500).json({ msg: err.message, success: false });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
