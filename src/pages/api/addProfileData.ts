import { addProfileData } from "@/lib/services/firebase/dataServices/profileDataService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerAddProfile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { line, product, shift, group, leader, date } = req.body;

      const docRef = await addProfileData(
        line,
        product,
        shift,
        group,
        leader,
        date
      );
      const docId = docRef.id;
      res
        .status(200)
        .json({ message: "Form data added to Firestore successfully", docId });
    } catch (error) {
      console.error("Error adding form data to Firestore:", error);
      res.status(500).json({ message: "Failed to add form data to Firestore" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
