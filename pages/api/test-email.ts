import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("Testing email configuration...");
    console.log("Email settings:", {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      user: process.env.EMAIL_USER ? "Set" : "Not set",
      pass: process.env.EMAIL_PASS ? "Set" : "Not set"
    });
    
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_PORT === "465",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    try {
      await transporter.verify();
      return res.status(200).json({ message: "Email configuration is valid" });
    } catch (err) {
      const verifyError = err as Error;
      console.error("Email verification error:", verifyError);
      return res.status(500).json({ 
        message: "Email configuration is invalid", 
        error: verifyError.message || "Unknown error" 
      });
    }
  } catch (err) {
    const error = err as Error;
    console.error("Email test error:", error);
    return res.status(500).json({ 
      message: "Failed to test email configuration", 
      error: error.message || "Unknown error" 
    });
  }
}