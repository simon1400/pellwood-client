import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order.model";

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

    await Order.findOneAndUpdate(
      { idOrder: req.body.refId },
      { status: req.body.status }
    );

    return res.status(200).json({
      msg: "Payment successfully processed",
      data: {},
    });
  } catch (err) {
    console.error("Payment update POST error:", err);
    return res.status(500).json({
      msg: err instanceof Error ? err.message : "Internal Server Error",
    });
  }
}
