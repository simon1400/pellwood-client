import dbConnect from '../../../../lib/dbConnect';
import Order from '../../../../models/order.model';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  if (method === 'GET') {
    console.log('GET /api/order/current/:id');

    try {
      const orderData = await Order.find({ _id: id });
      res.status(200).json(orderData);
    } catch (err) {
      console.log('Order getting', err);
      res.status(500).json({ msg: err.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
