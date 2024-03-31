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
      where("leader", "==", name),
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      const docId = doc.id;
      return { docId, ...data };
    } else {
      throw new Error("Document does not exist");
    }
  } catch (error) {
    console.error("Error getting data:", error);
    throw new Error("Failed to get data");
  }
}
