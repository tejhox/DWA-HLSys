import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import app from "../init";

const firestore = getFirestore(app);

export async function addDekidaka(
  docId: string,
  plan: number,
  actual: number,
  deviasi: number,
  lossTime: number,
  workHour: number,
  man?: number,
  method?: number,
  machine?: number,
  material?: number,
  notes?: string
) {
  try {
    const docRef = doc(firestore, "document", docId);
    const subColRef = collection(docRef, "dekidaka");
    const snapshot = await addDoc(subColRef, {
      plan: plan,
      actual: actual,
      deviasi: deviasi,
      lossTime: lossTime,
      workHour: workHour,
      lossTimeDetails: {
        man: man !== (null || undefined) ? man : 0,
        method: method !== (null || undefined) ? method : 0,
        machine: machine !== (null || undefined) ? machine : 0,
        material: material !== (null || undefined) ? material : 0,
        notes: notes !== (null || undefined) ? notes : "-",
      },
      time: serverTimestamp(),
    });
    return snapshot;
  } catch (error) {
    console.error("Error adding document subcollection to Firestore:", error);
    throw new Error("Failed to add document subcollection to Firestore");
  }
}

export async function updateDekidaka(
  docId: string,
  subDocId: string,
  plan: number,
  actual: number,
  deviasi: number,
  lossTime: number,
  man: number,
  method: number,
  machine: number,
  material: number,
  notes: string
) {
  try {
    const docRef = doc(firestore, "document", docId);
    const subDocRef = doc(docRef, "dekidaka", subDocId);
    const snapshot = await updateDoc(subDocRef, {
      plan: plan,
      actual: actual,
      deviasi: deviasi,
      lossTime: lossTime,
      lossTimeDetails: {
        man: man,
        method: method,
        machine: machine,
        material: material,
        notes: notes,
      },
    });
    return snapshot;
  } catch (error) {
    console.error("Error updating document:", error);
    throw new Error("Failed to add document subcollection to Firestore");
  }
}

export async function deleteDekidaka(docId: string, subDocId: string) {
  try {
    const docRef = doc(firestore, "document", docId);
    const subDocRef = doc(docRef, "dekidaka", subDocId);
    await deleteDoc(subDocRef);
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to add document subcollection to Firestore");
  }
}

export async function sumDekidaka(docId: string) {
  try {
    const docRef = doc(firestore, "document", docId);
    const subDocRef = collection(docRef, "dekidaka");
    const querySnapshot = await getDocs(subDocRef);

    let totalPlan = 0;
    let totalActual = 0;
    let totalDeviasi = 0;
    let totalLossTime = 0;
    let totalWorkHour = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      totalPlan += data.plan;
      totalActual += data.actual;
      totalDeviasi += data.deviasi;
      totalLossTime += data.lossTime;
      totalWorkHour += data.workHour;
    });

    const newData = {
      totalPlan,
      totalActual,
      totalDeviasi,
      totalLossTime,
      totalWorkHour,
    };

    const totalDocRef = doc(docRef, "dekidakaTotal", "1");
    const result = await setDoc(totalDocRef, newData);
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to accumulate and save data.");
  }
}

export async function getDekidaka(docId: string) {
  try {
    const docRef = doc(firestore, "document", docId);
    const subColRef = collection(docRef, "dekidaka");
    const q = query(subColRef, orderBy("time", "desc"));

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

export async function getDekidakaById(docId: string, subDocId: string) {
  try {
    const docRef = doc(firestore, "document", docId);
    const subDocRef = doc(docRef, "dekidaka", subDocId);
    const snapshot = await getDoc(subDocRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      throw new Error("document does not exist");
    }
  } catch (error) {
    console.error("Error fetching document ID:", error);
    throw new Error("Failed to fetch document ID from Firestore");
  }
}

export async function getDekidakaSum(docId: string) {
  try {
    const docRef = doc(firestore, "document", docId);
    const subDocRef = doc(docRef, "dekidakaTotal", "1");
    const snapshot = await getDoc(subDocRef);
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
