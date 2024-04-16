import { setPcsPerHour } from "@/lib/services/firebase/dataServices/KpiService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerSetPcsPerHour(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { docId, kpiDocId } = req.body;
    try {
      await setPcsPerHour(docId, kpiDocId);
      res.status(200).json({
        message: "Data processed successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed processing data!" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
