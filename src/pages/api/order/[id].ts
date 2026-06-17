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

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        // Retaining .find() to return an array, preserving UI expectations
        const orderData = await Order.find({ _id: id });
        return res.status(200).json(orderData);
      } catch (err) {
        console.error("Order GET error:", err);
        return res.status(500).json({
          msg: err instanceof Error ? err.message : "Internal Server Error",
        });
      }

    case "DELETE":
      try {
        const order = await Order.deleteOne({ _id: id });
        return res.status(200).json(order);
      } catch (err) {
        console.error("Order DELETE error:", err);
        return res.status(500).json({
          msg: err instanceof Error ? err.message : "Internal Server Error",
        });
      }

    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
