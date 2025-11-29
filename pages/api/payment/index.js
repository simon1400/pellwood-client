import dbConnect from '../../../lib/dbConnect';
import Order from '../../../models/order.model';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === 'POST') {
    console.log('POST /api/payment');

    try {
      await Order.findOneAndUpdate({ idOrder: req.body.refId }, { status: req.body.status });

      const response = {
        msg: "Payment successfully processed",
        data: {}
      };

      res.status(200).json(response);
    } catch (err) {
      console.log('payment.update', err);
      res.status(500).json({ msg: err.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
