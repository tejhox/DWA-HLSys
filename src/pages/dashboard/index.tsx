import { useSessionContext } from "@/context/sessionContext";
import { useAllStateContext } from "@/context/allStateContext";
import { useEffect } from "react";
import Sidebar from "../../views/dashboardViews/sidebar";
import DashboardNavbar from "@/views/dashboardViews/dashboardNavbar";
import MonitoringViews from "@/views/dashboardViews/dashboardContent/monitoring";
import KpiViews from "@/views/dashboardViews/dashboardContent/kpi";
import PlanRecord from "@/views/dashboardViews/dashboardContent/planRecord";

const AdminDashboard = () => {
  const { fetchSession, session } = useSessionContext();
  const {
    isMonitoringSubBtnActive,
    setIsMonitoringSubBtnActive,
    isKpiBtnActive,
    setLineName,
    isPlanRecordBtnActive,
    setIsEr01BtnActive,
    setIsEr02BtnActive,
    setIsEr03BtnActive,
    setIsEr150BtnActive,
    setIsMonitoringBtnActive,
    setIsPlanRecordBtnActive,
    setIsKpiBtnActive,
  } = useAllStateContext();

  useEffect(() => {
    fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    const handleEr01Btn = async () => {
      setIsEr01BtnActive(true);
      setIsEr02BtnActive(false);
      setIsEr03BtnActive(false);
      setIsEr150BtnActive(false);
      setLineName("ER01");
      setIsMonitoringSubBtnActive(true);
      setIsPlanRecordBtnActive(false);
      setIsKpiBtnActive(false);
      setIsMonitoringBtnActive(true);
    };
    handleEr01Btn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen">
      <div className="flex">
        <div className="w-1/6 min-h-screen bg-indigo-900">
          <Sidebar />
        </div>
        <div className="w-5/6 min-h-screen flex flex-col">
          <DashboardNavbar />
          <div className="bg-white px-1 py-2 full-height flex flex-grow">
            {isMonitoringSubBtnActive ? (
              <MonitoringViews />
            ) : isKpiBtnActive ? (
              <KpiViews />
            ) : isPlanRecordBtnActive ? (
              <PlanRecord />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
