import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "../init";

const firestore = getFirestore(app);

export async function getLastKpi(name: string) {
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

export async function setEfficiency(docId: string, kpiDocId: string) {
  try {
    const docRef = doc(firestore, "document", docId);
    const subDocRef = collection(docRef, "dekidakaTotal");
    const querySnapshot = await getDocs(subDocRef);

    let availableTime = 0;
    let effectiveTime = 0;
    let efficiency = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      availableTime = data.totalWorkHour;
      effectiveTime = data.totalWorkHour - data.totalLossTime;
      efficiency =
        ((data.totalWorkHour - data.totalLossTime) / data.totalWorkHour) * 100;
      const efficiencyRounded = (effectiveTime / data.totalWorkHour) * 100;
      efficiency = Math.round(efficiencyRounded)
        ? Math.round(efficiencyRounded)
        : 0;
    });

    const efficiencyDoc = {
      availableTime,
      effectiveTime,
      efficiency,
    };

    const kpiRef = doc(firestore, "kpi", kpiDocId);
    await updateDoc(kpiRef, { efficiencyDoc });
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to add KPI data.");
  }
}

export async function getEfficiency(docId: string) {
  try {
    const kpiRef = doc(firestore, "kpi", docId);
    const snapshot = await getDoc(kpiRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching document data:", error);
    throw new Error("Failed to fetch document data from Firestore");
  }
}

export async function getAllEficiency() {
  try {
    const docRef = collection(firestore, "kpi");
    const q = query(docRef, orderBy("time", "desc"));

    const snapshot = await getDocs(q);

    const subDekidakaData: any[] = [];
    snapshot.forEach((doc) => {
      subDekidakaData.push({ id: doc.id, ...doc.data() });
    });
    return subDekidakaData;
  } catch (error) {
    console.error("Error fetching document data:", error);
    throw new Error("Failed to fetch document data from Firestore");
  }
}
