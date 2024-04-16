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

export async function getLastProfileDoc(name: string) {
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

export async function getLastKpiDoc(name: string) {
  try {
    const q = query(
      collection(firestore, "kpi"),
      orderBy("time", "desc"),
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const latestDoc = querySnapshot.docs[0];
      const latestData = latestDoc.data();
      const kpiDocId = latestDoc.id;
      return { kpiDocId, ...latestData };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching document data:", error);
    throw new Error("Failed to fetch document data from Firestore");
  }
}
