import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const { data } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const [shadow, setShadow] = useState(true);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShadow(false);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleSignInOut = async () => {
    if (data) {
      await signOut();
    } else {
      await signIn();
    }
    closeMenu();
  };

  return (
    <div>
      <div
        className={showMenu ? "navbar" : "navbar shadow-md shadow-gray-500/40"}>
        <div className="flex-1 items-center">
          <Link href={"/home"} onClick={closeMenu}>
            <Image
              className="link link-hover shadow-md shadow-indigo-800/60 rounded-lg text-xl font-bold ms-0.5"
              src="/static/assets/dwa_logo.png"
              alt="logo"
              width={70}
              height={70}
            />
          </Link>
        </div>
        <div className="hidden sm:block">
          <ul className="menu px-1 align-middle sm:flex sm:flex-row">
            <li>
              <Link
                href={"/production"}
                className="font-semibold text-blue-700">
                LAPORAN PRODUKSI
              </Link>
            </li>
            <li>
              <button
                className="btn btn-ghost btn-sm mt-0.5 text-blue-700"
                onClick={() => (data ? signOut() : signIn())}>
                {data ? "SIGN OUT" : "SIGN IN"}
              </button>
            </li>
          </ul>
        </div>
        <div className="block sm:hidden">
          <button
            onClick={toggleMenu}
            className="btn btn-square btn-ghost text-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={showMenu === true ? "block" : "hidden"}>
        <div className="container flex justify-end w-screen lg:hidden">
          <ul className="flex flex-col w-full rounded-lg shadow-md shadow-indigo-500/50 text-end px-4 pb-3 sm:hidden">
            <li>
              <Link
                href="/production"
                onClick={closeMenu}
                className="link link-hover font-semibold text-sm text-blue-700">
                Laporan Produksi
              </Link>
            </li>
            <li>
              <button
                className="link link-hover mt-4 font-bold text-sm text-blue-700"
                onClick={handleSignInOut}>
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
