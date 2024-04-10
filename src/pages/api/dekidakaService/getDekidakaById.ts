import { getDekidakaById } from "@/lib/services/firebase/dataServices/DekidakaDataServices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerGetDekidakaById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { docId, subDocId } = req.query;
      if (
        !docId ||
        typeof docId !== "string" ||
        !subDocId ||
        typeof subDocId !== "string"
      ) {
        throw new Error("Invalid id parameter");
      }
      const data = await getDekidakaById(docId, subDocId);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching dekidaka by id:", error);
      res.status(500).json({ message: "Failed to fetch dekidaka by id" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}