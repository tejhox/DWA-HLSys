import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

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
        className={
          showMenu
            ? "navbar bg-content-content"
            : "navbar bg-content-content shadow-md"
        }>
        <div className="flex-1 -ms-3">
          <Link
            href={"/home"}
            onClick={closeMenu}
            className="btn btn-ghost text-xl">
            HL-M
          </Link>
        </div>
        <div className="hidden sm:block">
          <ul className="menu px-1 align-middle sm:flex sm:flex-row">
            <li>
              <Link href={"/production"} className="font-semibold">
                LAPORAN PRODUKSI
              </Link>
            </li>
            <li>
              <button
                className="btn btn-ghost btn-sm mt-0.5"
                onClick={() => (data ? signOut() : signIn())}>
                {data ? "SIGN OUT" : "SIGN IN"}
              </button>
            </li>
          </ul>
        </div>
        <div className="block sm:hidden">
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
        <div className="container flex justify-end w-screen lg:hidden">
          <ul className="flex flex-col w-full rounded-lg shadow-md text-end px-4 pb-3 sm:hidden">
            <li>
              <Link
                href="/production"
                onClick={closeMenu}
                className="link link-hover font-semibold text-sm">
                Laporan Produksi
              </Link>
            </li>
            <li>
              <button
                className="link link-hover mt-4 font-bold text-sm"
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
