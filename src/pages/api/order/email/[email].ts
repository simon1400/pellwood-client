import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { email },
    method,
  } = req;

  if (method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    await dbConnect();

    // Query either all orders or filter by exact email
    const orderData = email === "all"
      ? await Order.find({}).sort({ _id: -1 })
      : await Order.find({ email });

    return res.status(200).json({
      msg: "Order successfully getting",
      data: orderData,
    });
  } catch (err) {
    console.error("Order getting error:", err);
    return res.status(500).json({
      msg: err instanceof Error ? err.message : "Internal Server Error",
    });
  }
}
