import { getDailyKpi } from "@/lib/services/firebase/dataServices/KpiService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerGetAllLastKpi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { docId } = req.query;
      if (!docId || typeof docId !== "string") {
        res.status(400).json({ message: "Invalid docId parameter" });
        return;
      }
      const data = await getDailyKpi(docId);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Data not found" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
