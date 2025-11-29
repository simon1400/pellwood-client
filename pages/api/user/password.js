import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/user.model';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === 'PUT') {
    try {
      const { password, email } = req.body;

      const user = await User.findOneAndUpdate({ email: email }, { password: password });

      if (user) {
        const response = {
          msg: "User successfully found and updated",
          error: false
        };
        res.status(200).json(response);
      } else {
        res.status(401).json({ msg: 'error', error: true });
      }
    } catch (err) {
      console.log('user.password', err);
      res.status(500).json({ msg: err.message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
