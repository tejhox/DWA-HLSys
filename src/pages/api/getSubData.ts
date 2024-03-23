import { NextApiRequest, NextApiResponse } from "next";
import { getSubData } from "@/lib/services/firebase/dekidakaServices";

export default async function handlerSubData(
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
      const data = await getSubData(docId, subDocId);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching subData:", error);
      res.status(500).json({ message: "Failed to fetch subData" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
