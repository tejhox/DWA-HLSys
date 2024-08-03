import { getAllProfileData } from "@/lib/services/firebase/dataServices/ProfileDataService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerGetProfileData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const data = await getAllProfileData();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      res.status(500).json({ message: "Failed to fetch profile data" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
