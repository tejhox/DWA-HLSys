import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const { data } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <div className="navbar bg-content-content shadow-md ">
        <div className="flex-1 -ms-3">
          <Link href={"/home"} className="btn btn-ghost text-xl">
            HL PRO
          </Link>
        </div>
        <div className="hidden md:block">
          <ul className="menu menu-horizontal px-1 align-middle">
            <li>
              <button
                onClick={() => {
                  router.push("/production");
                }}>
                Laporan Produksi
              </button>
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
        <div className="block md:hidden">
          <button onClick={toggleMenu} className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={showMenu === true ? "block" : "hidden"}>
        <div className="container flex justify-end w-full pe-2 mt-4 lg:hidden">
          <ul className="flex flex-col w-1/2 rounded-lg shadow-md text-end px-4 pb-2">
            <li>
              <Link
                href="/production"
                className="link link-hover font-semibold text-sm">
                Laporan Produksi
              </Link>
            </li>
            <li>
              <button
                className="link link-hover mt-2 font-bold text-sm"
                onClick={() => (data ? signOut() : signIn())}>
                {data ? "Sign Out" : "Sign In"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
