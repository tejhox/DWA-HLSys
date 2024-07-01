import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";

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
            ? "navbar"
            : "navbar bg-base-100 shadow-lg shadow-gray-500/40"
        }>
        <div className="flex-1 items-center">
          <Link href={"/"} onClick={closeMenu} className="flex items-center">
            <Image
              className="hidden lg:block shadow-md shadow-indigo-800/60 rounded-lg text-xl font-bold"
              src="/static/assets/dwa_logo.png"
              alt="logo"
              width={80}
              height={66}
            />
            <Image
              className="lg:hidden shadow-md shadow-indigo-800/60 rounded-lg text-xl font-bold"
              src="/static/assets/dwa_logo.png"
              alt="logo"
              width={66}
              height={66}
            />
            <span className="hidden lg:block text-2xl font-extrabold text-blue-900 font-rajdhani ms-3">
              HL MONITORING SYSTEM
            </span>
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
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="btn btn-sm btn-ghost text-blue-700">
            <FontAwesomeIcon icon={faBarsStaggered} size="lg" />
          </button>
        </div>
      </div>
      <div className={showMenu === true ? "container w-full" : "hidden"}>
        <ul className="container rounded shadow-md shadow-gray-500/50 sm:hidden">
          <li className="flex justify-end me-4">
            <Link
              href="/production"
              onClick={closeMenu}
              className="link link-hover font-semibold text-sm text-blue-700">
              Laporan Produksi
            </Link>
          </li>
          <li className="flex justify-end me-4 pb-3">
            <button
              className="link link-hover mt-4 font-bold text-sm text-blue-700"
              onClick={handleSignInOut}>
              {data ? "Sign Out" : "Sign In"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
