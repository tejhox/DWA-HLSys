import Link from "next/link";
import style from "./navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data } = useSession();
  return (
    <div className={style.container}>
      <div className={style.brand}>
        <Link href="/home">HL PRO</Link>
      </div>
      <div className={style.itemsWrapper}>
        <div className={style.items}>
          <button onClick={() => (data ? signOut() : signIn())} className={style.button}>
            {data ? "Sign Out" : "Sign In"}
          </button>
        </div>
        <div className={style.items}>
          <Link href="/produksi">Laporan Produksi</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
