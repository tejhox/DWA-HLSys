import { setEfficiency } from "@/lib/services/firebase/dataServices/KpiService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerSetEfficiency(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { docId, kpiDocId } = req.body;
    try {
      await setEfficiency(docId, kpiDocId);
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
