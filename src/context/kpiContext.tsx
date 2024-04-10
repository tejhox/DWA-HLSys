import { createContext, useContext } from "react";
import { useGetDataContext } from "./getDataContext";
import axios from "axios";
import { useAppStateContext } from "./appStateContext";
import { KpiContextValue } from "./type/dataType";

const KpiContext = createContext<KpiContextValue | undefined>(undefined);

export const KpiProvider = ({ children }: any) => {
  const { profileId, kpiId } = useAppStateContext();
  const { getLastKpi } = useGetDataContext();

  const setEfficiency = async () => {
    try {
      await axios.post("/api/kpiService/setEfficiency", {
        docId: profileId,
        kpiDocId: kpiId,
      });
      getLastKpi();
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  const setLossTimeKpi = async () => {
    try {
      await axios.post("/api/kpiService/setLossTimeKpi", {
        docId: profileId,
        kpiDocId: kpiId,
      });
      getLastKpi();
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  const contextValue: KpiContextValue = {
    setEfficiency,
    setLossTimeKpi,
  };

  return (
    <KpiContext.Provider value={contextValue}>{children}</KpiContext.Provider>
  );
};

export const useKpiContext = () => {
  const context = useContext(KpiContext);
  if (!context) {
    throw new Error("useKpiContext must be used within a ProfileProvider");
  }
  return context;
};
