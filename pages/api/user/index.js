import mongoose from 'mongoose';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/user.model';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      console.log('GET /api/user');

      try {
        const users = await User.find();

        const response = {
          msg: "Users successfully retrieved",
          data: users
        };

        res.status(200).json(response);
      } catch (err) {
        console.log('user.get', err);
        res.status(500).json({ msg: err.message });
      }
      break;

    case 'POST':
      console.log('POST /api/user');

      try {
        const { email, password } = req.body;
        const user = { _id: mongoose.Types.ObjectId(), email, password };

        let emptyInput = [];
        let response = {};

        Object.keys(user).forEach((key) => {
          if (!user[key].length && key !== '_id') {
            emptyInput.push(String(key));
          }
        });

        const existUser = await User.findOne({ email: user.email });

        if (emptyInput.length) {
          response = {
            msg: "Empty input",
            error: emptyInput
          };
        } else if (existUser) {
          response = {
            msg: "User now exist",
            error: "email"
          };
        } else {
          const userData = await User.create(user);
          response = {
            msg: "User successfully created",
            data: userData
          };
        }

        res.status(201).json(response);
      } catch (err) {
        console.log('user.create', err);
        res.status(500).json({ msg: err.message });
      }
      break;

    case 'PUT':
      console.log('PUT /api/user');

      try {
        const { data, type } = req.body;

        let userData;

        if (type === 'update') {
          const id = data.id;
          await User.findOneAndUpdate({ _id: id }, data);
          userData = await User.findById(id);
        } else if (type === 'create') {
          data._id = mongoose.Types.ObjectId();
          userData = await User.create(data);
        }

        let response = {
          msg: "User successfully processed",
          data: userData
        };

        res.status(200).json(response);
      } catch (err) {
        console.log('user.update', err);
        res.status(500).json({ msg: err.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
