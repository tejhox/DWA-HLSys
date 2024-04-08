import { createContext, useContext } from "react";
import { useGetDataContext } from "./GetDataContext";
import axios from "axios";

type KpiContextValue = {
  setEfficiency: () => Promise<void>;
};

const KpiContext = createContext<KpiContextValue | undefined>(undefined);

export const KpiProvider = ({ children }: any) => {
  const { getDekidaka, getLastKpi, getDekidakaSum, profileId, kpiId } =
    useGetDataContext();

  const setEfficiency = async () => {
    try {
      await axios.post("/api/setEfficiency", {
        docId: profileId,
        kpiDocId: kpiId,
      });
      getLastKpi();
      getDekidaka();
      getDekidakaSum();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const contextValue: KpiContextValue = {
    setEfficiency,
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
