import { getLastKpi } from "@/lib/services/firebase/dataServices/KpiService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerGetLastKpi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { name } = req.query;
      if (!name || typeof name !== "string" || name.trim() === "") {
        res.status(400).json({ message: "Invalid name parameter" });
        return;
      }
      const data = await getLastKpi(name);
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ message: "Data not found" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
