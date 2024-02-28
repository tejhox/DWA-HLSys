import { collection, getDocs, getFirestore } from "firebase/firestore";
import { GetServerSideProps } from "next";
import app from "@/lib/firebase/init";

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const db = getFirestore(app);
  const usersCollection = collection(db, "users");
  const querySnapshot = await getDocs(usersCollection);

  const usersData: User[] = [];
  querySnapshot.forEach((doc) => {
    usersData.push({
      id: doc.id,
      nama: doc.data().nama,
      nik: doc.data().nik,
    });
  });

  return {
    props: {
      users: usersData,
    },
  };
};

// Definisikan tipe data untuk prop users
type User = {
  id: string;
  nama: string;
  nik: string;
};

type Props = {
  users: User[];
};

const HomePage = ({ users }: Props) => {
  return (
    <div>
      <h1>User Data</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.nama} {user.nik}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
