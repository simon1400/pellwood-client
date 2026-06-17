import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    await dbConnect();
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (user) {
      return res.status(200).json({
        msg: "User successfully found",
        error: false,
        data: user,
      });
    }

    return res.status(401).json({ msg: "error", error: true });
  } catch (err) {
    console.error("user.login error:", err);
    return res.status(500).json({
      msg: err instanceof Error ? err.message : "Internal Server Error",
    });
  }
}
