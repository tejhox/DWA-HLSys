import { sumDekidaka } from "@/lib/services/firebase/dataServices/DekidakaDataServices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerSumDekidaka(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { docId } = req.body;
    try {
      await sumDekidaka(docId);
      res.status(200).json({
        message: "Error processing Dekidaka data:",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed processing data!" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
