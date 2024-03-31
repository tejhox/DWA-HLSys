import { deleteProfile } from "@/lib/services/firebase/dataServices/profileDataService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerSubDekidaka(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      const { docId } = req.query;
      if (!docId || typeof docId !== "string") {
        throw new Error("Invalid id parameter");
      }
      const data = await deleteProfile(docId);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching Dekidaka data:", error);
      res.status(500).json({ message: "Failed to fetch Dekidaka data" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
