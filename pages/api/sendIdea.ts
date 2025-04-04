import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import clientPromise from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Message is required." });
  }

  try {
    // ✅ Save to MongoDB
    const client = await clientPromise;
    const db = client.db("portfolio");
    const collection = db.collection("ideas");

    await collection.insertOne({
      message,
      timestamp: new Date(),
    });

    // ✅ Send email
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: "New Idea from Portfolio Website",
      text: `New idea submission:\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Idea sent and saved!" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Failed to send idea", error });
  }
}
