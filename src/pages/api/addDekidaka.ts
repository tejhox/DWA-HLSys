import { addDekidaka } from "@/lib/services/firebase/mainServices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerDekidaka(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { id, plan, actual, deviasi, lossTime } = req.body;

      const docRef = await addDekidaka(id, plan, actual, deviasi, lossTime);

      const subDekidakaId = docRef.id;

      res.status(200).json({
        message: "Form data updated in Firestore successfully",
        subDekidakaId,
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
