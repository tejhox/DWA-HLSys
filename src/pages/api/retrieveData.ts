import { NextApiRequest, NextApiResponse } from "next";
import { getDekidakaData } from "@/lib/services/firebase/dekidakaServices";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await getDekidakaData();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res
        .status(500)
        .json({ message: "Failed to retrieve data from Firestore" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
