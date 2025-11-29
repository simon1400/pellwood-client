import dbConnect from '../../../../lib/dbConnect';
import Order from '../../../../models/order.model';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  if (method === 'GET') {
    console.log('GET /api/payment/status/:id');

    try {
      const orderData = await Order.find({ idOrder: id });

      const response = {
        msg: "Order status successfully retrieved",
        data: orderData
      };

      res.status(200).json(response);
    } catch (err) {
      console.log('Status get error ---', err);
      res.status(500).json({ msg: err.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
