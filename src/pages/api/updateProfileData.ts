import { updateProfileData } from "@/lib/services/firebase/dekidakaServices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerUpdateDekidaka(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    try {
      const { id, line, product, shift, date } = req.body;

      await updateProfileData(id, line, product, shift, date);

      res.status(200).json({
        message: "Profile updated in Firestore successfully",
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
