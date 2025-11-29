import { createTransporter } from '../../../lib/mailer';
import InfoOrder from '../../../mail_template/infoOrder';
import InfoOrderEN from '../../../mail_template/infoOrderEN';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    console.log('POST /api/send/orderInfo');

    try {
      const data = req.body;

      const transporter = await createTransporter();

      const mailOptions = {
        from: '"Objednávka dokončena - Pellwood" <info@pellwood.cz>',
        to: `${data.email}, info@pellwood.com`,
        subject: 'Objednávka č.: ' + data.idOrder,
        text: "Objednávka dokončena - Pellwood",
        html: data.currency == 'Kč' ? InfoOrder(data) : InfoOrderEN(data)
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
