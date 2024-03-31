import { getDekidaka } from "@/lib/services/firebase/dataServices/dekidakaDataServices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerSubDekidaka(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { docId } = req.query;
      if (!docId || typeof docId !== "string" || docId.trim() === "") {
        throw new Error("Invalid docId parameter");
      }
      const data = await getDekidaka(docId);
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ message: "Data not found" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
