import { getFirestore, collection, addDoc, getDoc, getDocs, doc, query, where, updateDoc } from "firebase/firestore";
import app from "./init";
import bcrypt from "bcrypt";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshot.data();

  return data;
}

export async function signUp(
  userData: {
    nik: string;
    password: string;
  },
  callback: Function
) {
  const q = query(collection(firestore, "users"), where("nik", "==", userData.nik));

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    // Jika NIK sudah ada, update dokumen yang ada dengan menambahkan data password
    const userDoc = doc(firestore, "users", data[0].id);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await updateDoc(userDoc, {
      password: hashedPassword,
    })
      .then(() => {
        callback(true);
      })
      .catch((error) => {
        callback(false);
        console.log(error);
      });
  } else {
    callback(false);
  }
}

export async function signIn(nik) {
  const q = query(collection(firestore, "users"), where("nik", "==", nik));

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data) {
    return data[0];
  } else {
    return null;
  }
}
