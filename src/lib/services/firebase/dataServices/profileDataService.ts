import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import app from "@/lib/services/firebase/init";

const firestore = getFirestore(app);

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
      time: serverTimestamp(),
    });
    return snapshot;
  } catch (error) {
    console.error("Error adding form data to Firestore:", error);
    throw new Error("Failed to add form data to Firestore");
  }
}

export async function getProfileData(docId: string) {
  try {
    const docRef = doc(firestore, "document", docId);
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

export async function updateProfileData(
  docId: string,
  line: string,
  product: string,
  shift: string,
  date: Timestamp
) {
  try {
    const docRef = doc(firestore, "document", docId);
    const snapshot = await updateDoc(docRef, {
      line,
      product,
      shift,
      date,
    });
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
