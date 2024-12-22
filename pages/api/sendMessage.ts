// pages/api/sendMessage.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, message } = req.body;

  // Validate input: Only `message` is mandatory for feedback
  if (!message) {
    return res.status(400).json({ message: "Message is required." });
  }

  try {
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
      from: email || process.env.EMAIL_FROM, // Use user's email or fallback to default
      to: process.env.EMAIL_TO, // Your email to receive messages
      subject: "New Feedback from Portfolio Website",
      text: email
        ? `Message from: ${email}\n\n${message}`
        : `Message: ${message}`, // Different text format if no email is provided
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Failed to send message", error });
  }
}
