import React, { createContext, useContext } from "react";
import axios from "axios";
import { useAppStateContext } from "./appStateContext";
import { GetDataContextValue } from "./type/dataType";

const GetDataContext = createContext<GetDataContextValue | undefined>(
  undefined
);

export const GetDataProvider = ({ children }: any) => {
  const {
    profileId,
    setProfileId,
    setLine,
    setProduct,
    setShift,
    setDate,
    setPlan,
    setActual,
    setDeviasi,
    setLossTime,
    setTotalPlan,
    setTotalActual,
    setTotalDeviasi,
    setTotalLossTime,
    setTotalWorkHour,
    setDekidakaData,
    setTableIndex,
    setDekidakaId,
    setIsLoading,
    setIsInputFilled,
    setIsCheckBtnDisabled,
    setIsSwitchProfileUi,
    setIsModalUpdateDekidakaOpen,
    userDataName,
    setKpiId,
    setKpiData,
    kpiId,
    setAvailableTime,
    setEffectiveTime,
    setEfficiency,
    setLossTimeKpi,
    setLossTimeRatio,
  } = useAppStateContext();

  const getLastProfile = async () => {
    try {
      const response = await axios.get(
        `/api/profileDataService/getLastProfile?name=${userDataName}`
      );
      const { docId } = response.data;
      setProfileId(docId);
      setLine(response.data.line);
      setProduct(response.data.product);
      setShift(response.data.shift);
      setDate(response.data.date);
      setIsInputFilled(true);
      setIsCheckBtnDisabled(true);
      setIsSwitchProfileUi(true);
    } catch {
      setLine("");
      setProduct("");
      setShift("");
      setDate("");
      setIsCheckBtnDisabled(false);
      setIsInputFilled(false);
    }
  };

  const getDekidaka = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `/api/dekidakaService/getDekidaka?docId=${profileId}`
      );
      setDekidakaData(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const getDekidakaSum = async () => {
    try {
      const response = await axios.get(
        `/api/dekidakaService/getDekidakaSum?docId=${profileId}`
      );
      setTotalPlan(response.data.totalPlan);
      setTotalActual(response.data.totalActual);
      setTotalDeviasi(response.data.totalDeviasi);
      setTotalLossTime(response.data.totalLossTime);
      setTotalWorkHour(response.data.totalWorkHour);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDekidakaById = async (itemId: string, index: number) => {
    setIsLoading(true);
    try {
      setIsModalUpdateDekidakaOpen(true);
      const response = await axios.get(
        `/api/dekidakaService/getDekidakaById?docId=${profileId}&subDocId=${itemId}`
      );
      setTableIndex(index);
      setPlan(response.data.plan);
      setActual(response.data.actual);
      setDeviasi(response.data.deviasi);
      setLossTime(response.data.lossTime);
      setDekidakaId(response.data.id);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getLastKpi = async () => {
    try {
      const response = await axios.get(
        `/api/kpiService/getLastKpi?name=${userDataName}`
      );
      if (response.data !== null) {
        const { kpiDocId } = response.data;
        setKpiId(kpiDocId);
      } else {
        setAvailableTime(0);
        setEffectiveTime(0);
        setEfficiency(0);
        setLossTimeKpi(0);
        setLossTimeRatio(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getEfficiency = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/kpiService/getEfficiency?docId=${kpiId}`
      );
      setAvailableTime(response.data.efficiencyDoc.availableTime);
      setEffectiveTime(response.data.efficiencyDoc.effectiveTime);
      setEfficiency(response.data.efficiencyDoc.efficiency);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const getLossTimeKpi = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/kpiService/getLossTimeKpi?docId=${kpiId}`
      );
      setAvailableTime(response.data.lossTimeDoc.availableTime);
      setLossTimeKpi(response.data.lossTimeDoc.lossTimeKpi);
      setLossTimeRatio(response.data.lossTimeDoc.lossTimeRatio);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const getAllKpiData = async () => {
    try {
      const response = await axios.get("/api/kpiService/getAllKpi");
      setKpiData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const contextValue: GetDataContextValue = {
    getDekidaka,
    getLastKpi,
    getLastProfile,
    getDekidakaById,
    getDekidakaSum,
    getEfficiency,
    getLossTimeKpi,
    getAllKpiData,
  };

  return (
    <GetDataContext.Provider value={contextValue}>
      {children}
    </GetDataContext.Provider>
  );
};

export const useGetDataContext = () => {
  const context = useContext(GetDataContext);
  if (!context) {
    throw new Error("useGetDataContext must be used within a ProfileProvider");
  }
  return context;
};
