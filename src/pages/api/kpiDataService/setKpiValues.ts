import {
  setCycleTimeAct,
  setEfficiency,
  setLossTimeRatio,
  setPcsPerHour,
  setProductivity,
} from "@/lib/services/firebase/dataServices/KpiService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerSetKpiValues(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { docId, kpiDocId } = req.body;
    try {
      await Promise.all([
        setEfficiency(docId, kpiDocId),
        setLossTimeRatio(docId, kpiDocId),
        setPcsPerHour(docId, kpiDocId),
        setProductivity(docId, kpiDocId),
        setCycleTimeAct(docId, kpiDocId),
      ]);

      res.status(200).json({ message: "Data processed successfully" });
    } catch (error) {
      console.error("Error processing data:", error);

      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Failed processing data!", error: error.message });
      } else {
        res
          .status(500)
          .json({ message: "Failed processing data!", error: "Unknown error" });
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
