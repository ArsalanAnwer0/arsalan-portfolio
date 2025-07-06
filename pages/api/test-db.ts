import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("Testing MongoDB connection...");
    const client = await clientPromise;
    const db = client.db("portfolio");
    const collections = await db.listCollections().toArray();

    return res.status(200).json({
      message: "MongoDB connection successful",
      collections: collections.map((c) => c.name),
    });
  } catch (err) {
    const error = err as Error;
    console.error("MongoDB connection error:", error);
    return res.status(500).json({
      message: "MongoDB connection failed",
      error: error.message || "Unknown error",
    });
  }
}
