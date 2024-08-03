import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const DashboardNavbar = () => {
  const { data } = useSession();
  return (
    <div className="navbar bg-white shadow-md shadow-gray-400/60 relative">
      <div className="navbar-start">
        <h1 className="text-2xl font-bold text-blue-900 font-rajdhani">
          HRS DASHBOARD
        </h1>
      </div>
      <div className="navbar-end">
        <button
          className={`btn ${
            data ? "btn-warning" : "bg-success"
          } btn-sm text-white me-3`}
          onClick={() => (data ? signOut() : signIn())}>
          {data ? "LOGOUT" : "LOGIN"}
        </button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
