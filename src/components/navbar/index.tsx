import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data } = useSession();
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <Link href={"/home"} className="btn btn-ghost text-xl">
          HL PRO
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 align-middle">
          <li>
            <Link href={"/production"}>Laporan Produksi</Link>
          </li>
          <li>
            <button
              className="btn btn-ghost btn-sm mt-0.5"
              onClick={() => (data ? signOut() : signIn())}>
              {data ? "Sign Out" : "Sign In"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
