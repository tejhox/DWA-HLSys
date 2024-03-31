import { addDekidaka } from "@/lib/services/firebase/dataServices/dekidakaDataServices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerDekidaka(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { docId, plan, actual, deviasi, lossTime } = req.body;

      const docRef = await addDekidaka(docId, plan, actual, deviasi, lossTime);

      const subDekidakaId = docRef.id;

      res.status(200).json({
        subDekidakaId,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to added form data to Firestore" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
