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
import app from "./init";

const firestore = getFirestore(app);

export async function getProfileData(id: string) {
  try {
    const docRef = doc(firestore, "document", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      throw new Error("document document does not exist");
    }
  } catch (error) {
    console.error("Error fetching document data:", error);
    throw new Error("Failed to fetch document data from Firestore");
  }
}

export async function getDekidaka(id: string) {
  try {
    const docRef = doc(firestore, "document", id);
    const subColRef = collection(docRef, "dekidaka");
    const q = query(subColRef, orderBy("timestamp", "desc"));

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
      throw new Error("document document does not exist");
    }
  } catch (error) {
    console.error("Error fetching document ID:", error);
    throw new Error("Failed to fetch document ID from Firestore");
  }
}

export async function addProfileData(
  line: string,
  product: string,
  shift: string,
  group: string,
  leader: string,
  date: Timestamp
) {
  try {
    const colRef = collection(firestore, "document");
    const snapshot = await addDoc(colRef, {
      line: line,
      group: group,
      leader: leader,
      product: product,
      shift: shift,
      date: date,
      timestamp: serverTimestamp(),
    });
    console.log("Form data added to Firestore successfully!");
    return snapshot;
  } catch (error) {
    console.error("Error adding form data to Firestore:", error);
    throw new Error("Failed to add form data to Firestore");
  }
}

export async function updateProfileData(
  id: string,
  line: string,
  product: string,
  shift: string,
  date: Timestamp
) {
  try {
    const docRef = doc(firestore, "document", id);
    const snapshot = await updateDoc(docRef, {
      line,
      product,
      shift,
      date,
    });
    console.log("Pofile updated successfully!");
    return snapshot;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to add document subcollection to Firestore");
  }
}

export async function deleteProfile(docId: string) {
  try {
    const docRef = doc(firestore, "document", docId);

    const dekidakaSnapshot = await getDocs(collection(docRef, "dekidaka"));
    dekidakaSnapshot.forEach(async (subDoc) => {
      await deleteDoc(subDoc.ref);
    });

    const dekidakaTotalSnapshot = await getDocs(
      collection(docRef, "dekidakaTotal")
    );
    dekidakaTotalSnapshot.forEach(async (subDoc) => {
      await deleteDoc(subDoc.ref);
    });

    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting profile:", error);
    throw new Error("Failed to delete document collection");
  }
}

export async function addDekidaka(
  id: string,
  plan: number,
  actual: number,
  deviasi: number,
  lossTime: number
) {
  try {
    const docRef = doc(firestore, "document", id);
    const subColRef = collection(docRef, "dekidaka");
    const snapshot = await addDoc(subColRef, {
      plan: plan,
      actual: actual,
      deviasi: deviasi,
      lossTime: lossTime,
      timestamp: serverTimestamp(),
    });
    const subDocId = snapshot.id;
    console.log(
      "document subcollection added to Firestore successfully with ID : ",
      subDocId
    );
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
  lossTime: number
) {
  try {
    const docRef = doc(firestore, "document", docId);
    const subDocRef = doc(docRef, "dekidaka", subDocId);
    const snapshot = await updateDoc(subDocRef, {
      plan: plan,
      actual: actual,
      deviasi: deviasi,
      lossTime: lossTime,
    });
    console.log("document subcollection updated successfully!");
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

export async function sumDekidaka(id: string) {
  try {
    const docRef = doc(firestore, "document", id);
    const subDocRef = collection(docRef, "dekidaka");
    const querySnapshot = await getDocs(subDocRef);

    let totalPlan = 0;
    let totalActual = 0;
    let totalDeviasi = 0;
    let totalLossTime = 0;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      totalPlan += data.plan;
      totalActual += data.actual;
      totalDeviasi += data.deviasi;
      totalLossTime += data.lossTime;
    });

    const newData = {
      totalPlan,
      totalActual,
      totalDeviasi,
      totalLossTime,
    };

    const totalDocRef = doc(docRef, "dekidakaTotal", "accumulation");
    const result = await setDoc(totalDocRef, newData);

    console.log("Data berhasil diakumulasi dan disimpan!");
    return result;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to accumulate and save data.");
  }
}

export async function getDekidakaSum(id: string) {
  try {
    const docRef = doc(firestore, "document", id);
    const subDocRef = doc(docRef, "dekidakaTotal", "accumulation");
    const snapshot = await getDoc(subDocRef);
    if (snapshot.exists()) {
      return { ...snapshot.data() };
    } else {
      throw new Error("document document does not exist");
    }
  } catch (error) {
    console.error("Error fetching document data:", error);
    throw new Error("Failed to fetch document data from Firestore");
  }
}
