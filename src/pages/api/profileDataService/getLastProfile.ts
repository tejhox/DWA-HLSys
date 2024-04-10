import { getLastProfile } from "@/lib/services/firebase/dataServices/GetLastDataServices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerGetLastProfile(
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
      const data = await getLastProfile(name);
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ message: "Data not found" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
