import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getFirestore,
} from "firebase/firestore";

import app from "@/lib/services/firebase/init";

const firestore = getFirestore(app);

export async function getLastProfile(name: string) {
  try {
    const q = query(
      collection(firestore, "document"),
      where("leader", "==", name)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const matchingDocs = querySnapshot.docs;
      matchingDocs.sort((a, b) => {
        const timeA = a.data().time;
        const timeB = b.data().time;
        return timeB - timeA;
      });

      const latestDoc = matchingDocs[0];
      const latestData = latestDoc.data();
      const docId = latestDoc.id;

      return { docId, ...latestData };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting data:", error);
    throw new Error("Failed to get data");
  }
}
