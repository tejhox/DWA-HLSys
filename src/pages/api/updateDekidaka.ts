import { updateDekidaka } from "@/lib/services/firebase/dataServices/dekidakaDataServices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerUpdateDekidaka(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    try {
      const { docId, subDocId, plan, actual, deviasi, lossTime } = req.body;

      await updateDekidaka(docId, subDocId, plan, actual, deviasi, lossTime);

      res.status(200).json({
        message: "Form data updated in Firestore successfully",
      });
    } catch (error) {
      console.error("Error updating form data in Firestore:", error);
      res
        .status(500)
        .json({ message: "Failed to update form data in Firestore" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
