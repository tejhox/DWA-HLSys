import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import app from "../init";

const firestore = getFirestore(app);

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

export async function setPcsPerHour(docId: string, kpiDocId: string) {
  try {
    const docRef = doc(firestore, "document", docId);
    const subDocRef = collection(docRef, "dekidakaTotal");
    const querySnapshot = await getDocs(subDocRef);

    let totalProduction = 0;
    let effectiveHour = 0;
    let pcsPerHour = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const roundedHour = (data.totalWorkHour - data.totalLossTime) / 60;
      totalProduction = data.totalActual;
      effectiveHour = Math.round(roundedHour * 10) / 10;
      const roundedResult =
        data.totalActual / ((data.totalWorkHour - data.totalLossTime) / 60);
      pcsPerHour = Math.round(roundedResult) ? Math.round(roundedResult) : 0;
    });

    const pcsPerHourDoc = {
      totalProduction,
      effectiveHour,
      pcsPerHour,
    };

    const kpiRef = doc(firestore, "kpi", kpiDocId);
    await updateDoc(kpiRef, { pcsPerHourDoc });
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to add KPI data.");
  }
}

export async function setLossTimeRatio(docId: string, kpiDocId: string) {
  try {
    const docRef = doc(firestore, "document", docId);
    const subDocRef = collection(docRef, "dekidakaTotal");
    const querySnapshot = await getDocs(subDocRef);

    let availableTime = 0;
    let lossTimeKpi = 0;
    let lossTimeRatio = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      availableTime = data.totalWorkHour;
      lossTimeKpi = data.totalLossTime;
      const lossTimeRatioRounded =
        (data.totalLossTime / data.totalWorkHour) * 100;
      lossTimeRatio = Math.round(lossTimeRatioRounded)
        ? Math.round(lossTimeRatioRounded)
        : 0;
    });

    const lossTimeDoc = {
      availableTime,
      lossTimeKpi,
      lossTimeRatio,
    };

    const kpiRef = doc(firestore, "kpi", kpiDocId);
    await updateDoc(kpiRef, { lossTimeDoc });
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to add KPI data.");
  }
}

export async function getDailyKpi(docId: string) {
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

export async function getAllKpiData() {
  try {
    const docRef = collection(firestore, "kpi");
    const snapshot = await getDocs(docRef);

    const kpiData: any[] = [];
    snapshot.forEach((doc) => {
      kpiData.push({ id: doc.id, ...doc.data() });
    });
    return kpiData;
  } catch (error) {
    console.error("Error fetching document data:", error);
    throw new Error("Failed to fetch document data from Firestore");
  }
}
