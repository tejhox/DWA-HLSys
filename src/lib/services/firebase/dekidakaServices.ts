import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import app from "./init";

const firestore = getFirestore(app);

export async function getProfileData(id: string) {
  try {
    const docRef = doc(firestore, "Dekidaka", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      throw new Error("Dekidaka document does not exist");
    }
  } catch (error) {
    console.error("Error fetching Dekidaka data:", error);
    throw new Error("Failed to fetch Dekidaka data from Firestore");
  }
}

export async function getDekidaka(id: string) {
  try {
    const docRef = doc(firestore, "Dekidaka", id);
    const subColRef = collection(docRef, "dekidaka");
    const snapshot = await getDocs(subColRef);

    const subDekidakaData: any[] = [];
    snapshot.forEach((doc) => {
      subDekidakaData.push({ id: doc.id, ...doc.data() });
    });
    return subDekidakaData;
  } catch (error) {
    console.error("Error fetching Dekidaka data:", error);
    throw new Error("Failed to fetch Dekidaka data from Firestore");
  }
}

export async function getSubData(docId: string, subDocId: string) {
  try {
    const docRef = doc(firestore, "Dekidaka", docId);
    const subDocRef = doc(docRef, "dekidaka", subDocId);
    const snapshot = await getDoc(subDocRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      throw new Error("Dekidaka document does not exist");
    }
  } catch (error) {
    console.error("Error fetching Dekidaka ID:", error);
    throw new Error("Failed to fetch Dekidaka ID from Firestore");
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
    const colRef = collection(firestore, "Dekidaka");
    const snapshot = await addDoc(colRef, {
      line: line,
      group: group,
      leader: leader,
      product: product,
      shift: shift,
      date: date,
    });
    console.log("Form data added to Firestore successfully!");
    return snapshot;
  } catch (error) {
    console.error("Error adding form data to Firestore:", error);
    throw new Error("Failed to add form data to Firestore");
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
    const docRef = doc(firestore, "Dekidaka", id);
    const subColRef = collection(docRef, "dekidaka");
    const snapshot = await addDoc(subColRef, {
      plan: plan,
      actual: actual,
      deviasi: deviasi,
      lossTime: lossTime,
    });
    const subDocId = snapshot.id;
    console.log(
      "Dekidaka subcollection added to Firestore successfully with ID : ",
      subDocId
    );
    return snapshot;
  } catch (error) {
    console.error("Error adding Dekidaka subcollection to Firestore:", error);
    throw new Error("Failed to add Dekidaka subcollection to Firestore");
  }
}

export async function updateDekidaka(
  id: string,
  plan: number,
  actual: number,
  deviasi: number,
  lossTime: number
) {
  try {
    const docRef = doc(firestore, "Dekidaka", id);
    const subColRef = collection(docRef, "dekidaka");
    const subDocRef = doc(subColRef, id);
    const snapshot = await updateDoc(subDocRef, {
      plan: plan,
      actual: actual,
      deviasi: deviasi,
      lossTime: lossTime,
    });
    console.log("Dekidaka subcollection added to Firestore successfully!");
    return snapshot;
  } catch (error) {
    console.error("Error adding Dekidaka subcollection to Firestore:", error);
    throw new Error("Failed to add Dekidaka subcollection to Firestore");
  }
}
