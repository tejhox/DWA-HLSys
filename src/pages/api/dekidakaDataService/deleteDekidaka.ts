import { deleteDekidaka } from "@/lib/services/firebase/dataServices/DekidakaDataServices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerDeleteDekidaka(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      const { docId, subDocId } = req.query;
      if (
        !docId ||
        typeof docId !== "string" ||
        !subDocId ||
        typeof subDocId !== "string"
      ) {
        throw new Error("Invalid id parameter");
      }
      const data = await deleteDekidaka(docId, subDocId);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error deleting Dekidaka data:", error);
      res.status(500).json({ message: "Failed to delete Dekidaka data" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
