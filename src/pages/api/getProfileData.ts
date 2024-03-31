import { getProfileData } from "@/lib/services/firebase/dataServices/profileDataService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerProfileData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { docId } = req.query;
      if (!docId || typeof docId !== "string") {
        throw new Error("Invalid docId parameter");
      }
      const data = await getProfileData(docId);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      res.status(500).json({ message: "Failed to fetch profile data" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
