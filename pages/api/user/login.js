import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/user.model';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  if (method === 'POST') {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email: email, password: password });

      if (user) {
        const response = {
          msg: "User successfully found",
          error: false,
          data: user
        };
        res.status(200).json(response);
      } else {
        res.status(401).json({ msg: 'error', error: true });
      }
    } catch (err) {
      console.log('user.login', err);
      res.status(500).json({ msg: err.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
