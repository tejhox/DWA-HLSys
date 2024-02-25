import Link from "next/link";
import style from "./navbar.module.css";

const Navbar = () => {
  return (
    <div className={style.container}>
      <div className={style.brand}>
        <Link href="/home">HL PRO</Link>
      </div>
      <div className={style.items}>
        <Link href="/auth/login">Sign In</Link>
      </div>
    </div>
  );
};

export default Navbar;
