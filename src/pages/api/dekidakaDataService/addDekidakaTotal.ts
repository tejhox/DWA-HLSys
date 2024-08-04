import { addDekidakaTotal } from "@/lib/services/firebase/dataServices/DekidakaDataServices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerAddDekidakaTotal(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const {
        totalPlan,
        totalActual,
        totalDeviasi,
        totalLossTime,
        totalWorkHour,
      } = req.body;

      const docRef = await addDekidakaTotal(
        totalPlan,
        totalActual,
        totalDeviasi,
        totalLossTime,
        totalWorkHour
      );

      const dekidakaTotalId = docRef.id;

      res.status(200).json({
        message: "Failed to added form data to Firestore",
        dekidakaTotalId,
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
