import { getDekidaka } from "@/lib/services/firebase/dataServices/DekidakaDataServices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerGetDekidaka(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { docId } = req.query;
      if (!docId || typeof docId !== "string") {
        throw new Error("Invalid docId parameter");
      }
      const data = await getDekidaka(docId);
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
