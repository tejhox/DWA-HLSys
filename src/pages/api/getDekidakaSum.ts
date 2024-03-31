import { getDekidakaSum } from "@/lib/services/firebase/dataServices/dekidakaDataServices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerDekidakaTotal(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { docId } = req.query;
      if (!docId || typeof docId !== "string") {
        throw new Error("Invalid docId parameter");
      }
      const data = await getDekidakaSum(docId);
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ message: "Data not found" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
