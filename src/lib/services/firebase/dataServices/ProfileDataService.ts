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
  runTransaction,
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
    const kpiRef = collection(firestore, "kpi");

    const snapshot = await runTransaction(firestore, async () => {
      const docValue = await addDoc(colRef, {
        line: line,
        group: group,
        leader: leader,
        product: product,
        shift: shift,
        date: date,
        time: serverTimestamp(),
      });

      const kpiValue = await addDoc(kpiRef, {
        line: line,
        group: group,
        leader: leader,
        date: date,
        time: serverTimestamp(),
      });

      return { docValue, kpiValue };
    });
    const docId = snapshot.docValue.id;
    const kpiDocId = snapshot.kpiValue.id;

    return { docId, kpiDocId };
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
  kpiDocId: string,
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

    const kpiDocref = doc(firestore, "kpi", kpiDocId);
    const kpiSnapshot = await updateDoc(kpiDocref, {
      line,
      date,
    });

    return { snapshot, kpiSnapshot };
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to add document subcollection to Firestore");
  }
}

export async function deleteProfile(docId: string, kpiDocId: string) {
  try {
    const documentDocRef = doc(firestore, "document", docId);
    const kpiRef = doc(firestore, "kpi", kpiDocId);

    const dekidakaSnapshot = await getDocs(
      collection(documentDocRef, "dekidaka")
    );
    dekidakaSnapshot.forEach(async (subDoc) => {
      await deleteDoc(subDoc.ref);
    });

    const dekidakaTotalSnapshot = await getDocs(
      collection(documentDocRef, "dekidakaTotal")
    );
    dekidakaTotalSnapshot.forEach(async (subDoc) => {
      await deleteDoc(subDoc.ref);
    });

    await deleteDoc(kpiRef);
    await deleteDoc(documentDocRef);
  } catch (error) {
    console.error("Error deleting profile:", error);
    throw new Error("Failed to delete document collection");
  }
}
