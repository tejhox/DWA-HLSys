import { getKpiDataByLine } from "@/lib/services/firebase/dataServices/KpiService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerGetKpiDataByLine(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { lineName } = req.query;
    if (
      !lineName ||
      typeof lineName !== "string" ||
      !lineName ||
      typeof lineName !== "string"
    ) {
      throw new Error("Invalid value of parameter");
    }
    try {
      const data = await getKpiDataByLine(lineName);
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ message: "Data not found" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
