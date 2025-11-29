import dbConnect from '../../../lib/dbConnect';
import Order from '../../../models/order.model';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      console.log('GET /api/order/:id');

      try {
        const orderData = await Order.find({ _id: id });
        res.status(200).json(orderData);
      } catch (err) {
        console.log('Order getting', err);
        res.status(500).json({ msg: err.message });
      }
      break;

    case 'DELETE':
      console.log('DELETE /api/order/:id');

      try {
        const order = await Order.deleteOne({ _id: id });
        res.status(200).json(order);
      } catch (err) {
        console.log('Order delete ---', err);
        res.status(500).json({ msg: err.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
