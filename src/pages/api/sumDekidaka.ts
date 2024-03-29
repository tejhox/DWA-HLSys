import { sumDekidaka } from "@/lib/services/firebase/dataServices";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerSumDekidaka(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id } = req.body;
    try {
      const docRef = await sumDekidaka(id);
      res.status(200).json({
        message: "Data berhasil diakumulasi dan disimpan!",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Gagal menyimpan data!" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
