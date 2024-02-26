import { getFirestore, Firestore, doc, getDoc } from "firebase/firestore";
import app from "./init";

const db: Firestore = getFirestore(app);

const fetchData = async () => {
  const docRef = doc(db, "users", "1");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    console.log("No such document!");
  }
};

fetchData();
