import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { MongoClient } from 'mongodb';
import clientPromise from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!message) {
    return res.status(400).json({ message: "Message is required." });
  }

  try {
    let dbSuccess = false;
    // Try MongoDB first, but don't let it block email sending if it fails
    try {
      // ✅ Save to MongoDB
      const client = await Promise.race([
        clientPromise,
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error("MongoDB connection timeout")), 5000))
      ]) as MongoClient;
      
      const db = client.db("portfolio");
      const collection = db.collection("contact_messages");

      await collection.insertOne({
        name: name || "Anonymous",
        email: email || "Not provided",
        message,
        timestamp: new Date(),
      });
      
      dbSuccess = true;
      console.log("Message saved to MongoDB");
    } catch (dbError) {
      console.error("MongoDB Error:", dbError);
      // Continue with email even if DB fails
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 5000,
      greetingTimeout: 5000,
      socketTimeout: 5000
    });

    const mailOptions = {
      from: email || process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: "New Feedback from Portfolio Website",
      text: email
        ? `From: ${email}\nName: ${name || "Anonymous"}\n\n${message}`
        : `Message: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    return res.status(200).json({ 
      message: dbSuccess ? "Message sent and saved!" : "Message sent but not saved to database",
      dbSuccess
    });
  } catch (error: any) {
    console.error("Error:", error);
    return res.status(500).json({ 
      message: "Failed to send message", 
      error: error.message || "Unknown error" 
    });
  }
}