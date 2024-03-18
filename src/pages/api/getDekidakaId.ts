import { getDekidakaId } from "@/lib/services/firebase/dekidakaServices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const dekidakaData = await getDekidakaId(id as string);
      res.status(200).json(dekidakaData);
    } catch (error) {
      console.error("Error retrieving Dekidaka data:", error);
      res.status(500).json({ message: "Failed to retrieve Dekidaka data" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
