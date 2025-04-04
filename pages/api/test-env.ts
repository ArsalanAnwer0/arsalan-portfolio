import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    MONGODB_URI: !!process.env.MONGODB_URI,
    EMAIL_USER: !!process.env.EMAIL_USER,
    EMAIL_PASS: !!process.env.EMAIL_PASS,
    EMAIL_HOST: !!process.env.EMAIL_HOST,
    EMAIL_PORT: !!process.env.EMAIL_PORT,
    EMAIL_FROM: !!process.env.EMAIL_FROM,
    EMAIL_TO: !!process.env.EMAIL_TO,
  });
}
