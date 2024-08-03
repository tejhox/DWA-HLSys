import { createContext, useContext } from "react";
import { useGetDataContext } from "./getDataContext";
import axios from "axios";
import { useAllStateContext } from "./allStateContext";
import { KpiContextValue } from "./type/dataType";

const KpiContext = createContext<KpiContextValue | undefined>(undefined);

export const KpiProvider = ({ children }: any) => {
  const { profileId, kpiId } = useAllStateContext();
  const { getLastKpiDoc } = useGetDataContext();

  const setKpi = async () => {
    try {
      await axios.post("/api/kpiDataService/setKpiValues", {
        docId: profileId,
        kpiDocId: kpiId,
      });

      getLastKpiDoc();
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };

  const contextValue: KpiContextValue = {
    setKpi,
  };

  return (
    <KpiContext.Provider value={contextValue}>{children}</KpiContext.Provider>
  );
};

export const useKpiContext = () => {
  const context = useContext(KpiContext);
  if (!context) {
    throw new Error("Error accessing context");
  }
  return context;
};
