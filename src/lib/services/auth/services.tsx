import app from "@/lib/services/firebase/init";
import bcrypt from "bcrypt";
import { retrieveDataByField } from "@/lib/services/firebase/service";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

const firestore = getFirestore(app);

export async function signUp(
  userData: {
    id: string;
    nik: string;
    password: string;
  },
  callback: Function
) {
  const data = await retrieveDataByField("users", "nik", userData.nik);

  if (data.length > 0) {
    const userDoc = doc(firestore, "users", data[0].id);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await updateDoc(userDoc, {
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date(),
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

export async function signIn(nik: string) {
  const data = await retrieveDataByField("users", "nik", nik);
  if (data) {
    return data[0];
  } else {
    return null;
  }
}
