import { getAllDekidakaSumData } from "@/lib/services/firebase/dataServices/DekidakaDataServices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerGetAllDekidakaSumData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await getAllDekidakaSumData();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
