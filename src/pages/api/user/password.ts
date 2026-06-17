import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  if (method !== "PUT") {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    await dbConnect();
    const { password, email } = req.body;

    const user = await User.findOneAndUpdate(
      { email },
      { password }
    );

    if (user) {
      return res.status(200).json({
        msg: "User successfully found and updated",
        error: false,
      });
    }

    return res.status(401).json({ msg: "error", error: true });
  } catch (err) {
    console.error("user.password error:", err);
    return res.status(500).json({
      msg: err instanceof Error ? err.message : "Internal Server Error",
    });
  }
}
