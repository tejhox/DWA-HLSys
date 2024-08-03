import { getDekidakaSum } from "@/lib/services/firebase/dataServices/DekidakaDataServices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerDekidakaTotal(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { profileId } = req.query;
      if (!profileId || typeof profileId !== "string") {
        throw new Error("Invalid profileId parameter");
      }
      const data = await getDekidakaSum(profileId);
      res.status(200).json(data);
    } catch (error) {
      res.status(404).json({ message: "Data not found" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
