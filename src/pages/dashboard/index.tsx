import React, { useEffect } from "react";
import Sidebar from "../../views/sidebar";
import { useSessionContext } from "@/context/sessionContext";

const AdminDashboard = () => {
  const { fetchSession, session } = useSessionContext();
  useEffect(() => {
    fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return <Sidebar />;
};

export default AdminDashboard;
