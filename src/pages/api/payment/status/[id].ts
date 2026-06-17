import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  if (method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  try {
    await dbConnect();

    // Keeping .find() to preserve existing UI array response expectation
    const orderData = await Order.find({ idOrder: id });

    return res.status(200).json({
      msg: "Order status successfully retrieved",
      data: orderData,
    });
  } catch (err) {
    console.error("Status GET error:", err);
    return res.status(500).json({
      msg: err instanceof Error ? err.message : "Internal Server Error",
    });
  }
}
