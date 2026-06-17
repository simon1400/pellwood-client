import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (!["GET", "POST", "PUT"].includes(method as string)) {
    res.setHeader("Allow", ["GET", "POST", "PUT"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  await dbConnect();

  try {
    if (method === "GET") {
      const users = await User.find();
      return res.status(200).json({
        msg: "Users successfully retrieved",
        data: users,
      });
    }

    if (method === "POST") {
      const { email, password } = req.body;
      const userObj: Record<string, any> = { _id: new mongoose.Types.ObjectId(), email, password };

      const emptyInput: string[] = [];
      Object.keys(userObj).forEach((key) => {
        if (!userObj[key]?.length && key !== "_id") {
          emptyInput.push(String(key));
        }
      });

      if (emptyInput.length) {
        return res.status(201).json({
          msg: "Empty input",
          error: emptyInput,
        });
      }

      const existUser = await User.findOne({ email });

      if (existUser) {
        return res.status(201).json({
          msg: "User now exist",
          error: "email",
        });
      }

      const userData = await User.create(userObj);
      return res.status(201).json({
        msg: "User successfully created",
        data: userData,
      });
    }

    if (method === "PUT") {
      const { data, type } = req.body;
      let userData;

      if (type === "update") {
        const id = data.id;
        await User.findOneAndUpdate({ _id: id }, data);
        userData = await User.findById(id);
      } else if (type === "create") {
        data._id = new mongoose.Types.ObjectId();
        userData = await User.create(data);
      }

      return res.status(200).json({
        msg: "User successfully processed",
        data: userData,
      });
    }
  } catch (err) {
    console.error(`user.${method?.toLowerCase() || "action"} error:`, err);
    return res.status(500).json({
      msg: err instanceof Error ? err.message : "Internal Server Error",
    });
  }
}
