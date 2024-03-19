import { NextApiRequest, NextApiResponse } from "next";
import { getProfileData } from "@/lib/services/firebase/dekidakaServices";

export default async function handlerProfileData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      if (!id || typeof id !== "string") {
        throw new Error("Invalid id parameter");
      }
      const data = await getProfileData(id);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      res.status(500).json({ message: "Failed to fetch profile data" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
