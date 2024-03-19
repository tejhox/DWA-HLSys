import { NextApiRequest, NextApiResponse } from "next";
import { getDekidaka } from "@/lib/services/firebase/dekidakaServices";

export default async function handlerSubDekidaka(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string") {
        throw new Error("Invalid id parameter");
      }
      const data = await getDekidaka(id);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching Dekidaka data:", error);
      res.status(500).json({ message: "Failed to fetch Dekidaka data" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
