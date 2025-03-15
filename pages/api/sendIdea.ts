// pages/api/sendIdea.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import clientPromise from "../../lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { message } = req.body;

  // Validate input
  if (!message) {
    return res.status(400).json({ message: "Message is required." });
  }

  try {
    // 1. Store idea in MongoDB
    try {
      const client = await clientPromise;
      const db = client.db("portfolio");
      
      await db.collection("ideas").insertOne({
        message,
        timestamp: new Date()
      });
      
      console.log("Idea stored in database");
    } catch (dbError) {
      console.error("Error storing in database:", dbError);
      // Continue with email sending even if DB storage fails
    }

    // 2. Send email notification
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Construct email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: "New Idea from Portfolio Website",
      text: `New idea submission: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Idea sent successfully" });
  } catch (error) {
    console.error("Error processing submission:", error);
    return res.status(500).json({ message: "Failed to send idea", error });
  }
}