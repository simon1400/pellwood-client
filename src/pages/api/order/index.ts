import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import axios from "axios";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/order.model";

// CORS middleware helper
function setCorsHeaders(res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept"
  );
  res.setHeader("Access-Control-Max-Age", "3600");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  // Set CORS headers for all requests
  setCorsHeaders(res);

  // Handle OPTIONS request (preflight)
  if (method === "OPTIONS") {
    return res.status(204).end();
  }

  await dbConnect();

  if (method === "GET") {
    try {
      const orderData = await Order.find({}).sort({ _id: -1 });

      return res.status(200).json({
        msg: "Order successfully getting",
        data: orderData,
      });
    } catch (err) {
      console.error("Order GET error:", err);
      return res.status(500).json({
        msg: err instanceof Error ? err.message : "Internal Server Error",
      });
    }
  }

  if (method === "POST") {
    try {
      const {
        note,
        currency,
        user,
        basket,
        payment,
        delivery,
        sum,
        status,
      } = req.body;

      const order = {
        _id: new mongoose.Types.ObjectId(),
        email: user.email,
        phone: user.phone,
        name: user.name,
        surname: user.surname,
        country: user.country,
        city: user.city,
        address: user.address,
        code: user.code,
        anotherAdress: user.anotherAdress,
        companyData: user.companyData,
        anotherAddressCheck: user.anotherAddressCheck,
        companyDataCheck: user.companyDataCheck,
        currency,
        note,
        basket,
        sum,
        idOrder: Math.floor(Math.random() * 1000000),
        status,
        state: "new",
        paymentMethod: payment.value,
        paymentPrice: payment.price,
        payOnline: payment.payOnline,
        deliveryMethod: delivery.value,
        deliveryPrice: delivery.price,
      };

      let resDataParse: Record<string, string> = {};

      if (payment.payOnline) {
        const paymentData = {
          merchant: "147005",
          price: String(Math.floor(sum * 100)),
          lang: currency === "Kč" ? "cs" : "en",
          curr: currency === "Kč" ? "CZK" : "EUR",
          label: `${user.name}-${user.surname}`,
          refId: String(order.idOrder),
          cat: "DIGITAL",
          method: "ALL",
          prepareOnly: "true",
          email: user.email,
          secret: "MBfhNsBL5v2DaKIhUnVsipeHyHwfoYhY",
        };

        // Leverage native URLSearchParams instead of manual loop and encodeURIComponent
        const params = new URLSearchParams(paymentData);

        const resPayment = await axios.post(
          `https://payments.comgate.cz/v1.0/create?${params.toString()}`
        );

        // Native parsing of Comgate url-encoded response
        const responseParams = new URLSearchParams(resPayment.data);
        for (const [key, value] of responseParams.entries()) {
          resDataParse[key] = value;
        }
      }

      const resOrder = await Order.create(order);

      const zboziConverseBody = {
        PRIVATE_KEY: "W9CQNC9gPMhvp4gQmyrj1XEmjnUuNFph",
        sandbox: false,
        orderId: order.idOrder,
        email: order.email,
        deliveryType: "PPL",
        // Safely extract price digits even if value is "ZDARMA"
        deliveryPrice: parseInt(String(order.deliveryPrice)) || 0,
        paymentType: order.paymentMethod,
        otherCosts: parseInt(String(order.paymentPrice)) || 0,
        cart: basket.map((item: any) => ({
          itemId: item.id,
          productName: `${item.nameProduct}${item.variantName ? " - " + item.variantName : ""}`,
          unitPrice: Number(item.variantPrice) || 0,
          quantity: Number(item.countVariant) || 1,
        })),
      };

      await axios
        .post(
          `https://www.zbozi.cz/action/153477/conversion/backend`,
          zboziConverseBody
        )
        .catch((err) =>
          console.error("Zbozi Conversion ERROR:", err.response?.data?.problemTypes || err.message)
        );

      return res.status(200).json({
        msg: "Order successfully created",
        data: payment.payOnline ? resDataParse : resOrder,
      });
    } catch (err) {
      console.error("Order POST error:", err);
      return res.status(500).json({
        msg: err instanceof Error ? err.message : "Internal Server Error",
      });
    }
  }

  if (method === "PUT") {
    try {
      const { _id, state } = req.body;
      const order = await Order.updateOne(
        { _id },
        { state },
        { upsert: true }
      );

      return res.status(200).json(order);
    } catch (err) {
      console.error("Order PUT error:", err);
      return res.status(500).json({
        msg: err instanceof Error ? err.message : "Internal Server Error",
      });
    }
  }

  res.setHeader("Allow", ["GET", "POST", "PUT"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
