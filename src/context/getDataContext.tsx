import React, { createContext, useContext } from "react";
import axios from "axios";
import { useAllStateContext } from "./allStateContext";
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
    setDekidakaSumData,
    setTableIndex,
    setDekidakaId,
    setIsProfileLoading,
    setIsDekidakaLoading,
    setIsModalLoading,
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
    setTotalProduction,
    setEffectiveHour,
    setPcsPerHour,
    setMan,
    setMethod,
    setMachine,
    setMaterial,
    setManNote,
    setMethodNote,
    setMachineNote,
    setMaterialNote,
  } = useAllStateContext();

  const getLastProfileDoc = async () => {
    try {
      setIsProfileLoading(true);
      const response = await axios.get(
        `/api/profileDataService/getLastProfileDoc?name=${userDataName}`
      );

      const { docId } = response.data;
      setProfileId(docId);
      setLine(response.data.line);
      setProduct(response.data.product);
      setShift(response.data.shift);
      setDate(response.data.date);
      setIsProfileLoading(false);
      setIsInputFilled(true);
      setIsCheckBtnDisabled(true);
      setIsSwitchProfileUi(true);
    } catch {
      setLine("");
      setProduct("");
      setShift("");
      setDate("");
      setIsProfileLoading(false);
      setIsCheckBtnDisabled(false);
      setIsInputFilled(false);
    }
  };

  const getDekidaka = async () => {
    try {
      setIsDekidakaLoading(true);
      const response = await axios.get(
        `/api/dekidakaDataService/getDekidaka?docId=${profileId}`
      );
      setDekidakaData(response.data);
      setIsDekidakaLoading(false);
    } catch (error) {
      setIsDekidakaLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const getDekidakaSum = async () => {
    try {
      const response = await axios.get(
        `/api/dekidakaDataService/getDekidakaSum?docId=${profileId}`
      );
      setDekidakaSumData(response.data);
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
    setIsModalLoading(true);
    try {
      setIsModalUpdateDekidakaOpen(true);
      const response = await axios.get(
        `/api/dekidakaDataService/getDekidakaById?docId=${profileId}&subDocId=${itemId}`
      );
      setTableIndex(index);
      setPlan(response.data.plan);
      setActual(response.data.actual);
      setDeviasi(response.data.deviasi);
      setLossTime(response.data.lossTime);
      setMan(response.data.lossTimeDetails.manCat.man);
      setMethod(response.data.lossTimeDetails.methodCat.method);
      setMachine(response.data.lossTimeDetails.machineCat.machine);
      setMaterial(response.data.lossTimeDetails.materialCat.material);
      setManNote(response.data.lossTimeDetails.manCat.manNote);
      setMethodNote(response.data.lossTimeDetails.methodCat.methodNote);
      setMachineNote(response.data.lossTimeDetails.machineCat.machineNote);
      setMaterialNote(response.data.lossTimeDetails.materialCat.materialNote);
      setDekidakaId(response.data.id);
      setIsModalLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getLastKpiDoc = async () => {
    try {
      const response = await axios.get(
        `/api/kpiDataService/getLastKpiDoc?name=${userDataName}`
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

  const getDailyKpi = async () => {
    setIsDekidakaLoading(true);
    try {
      const response = await axios.get(
        `/api/kpiDataService/getDailyKpi?docId=${kpiId}`
      );
      setAvailableTime(response.data.efficiencyDoc.availableTime);
      setEffectiveTime(response.data.efficiencyDoc.effectiveTime);
      setEfficiency(response.data.efficiencyDoc.efficiency);
      setLossTimeKpi(response.data.lossTimeDoc.lossTimeKpi);
      setLossTimeRatio(response.data.lossTimeDoc.lossTimeRatio);
      setEffectiveHour(response.data.pcsPerHourDoc.effectiveHour);
      setTotalProduction(response.data.pcsPerHourDoc.totalProduction);
      setPcsPerHour(response.data.pcsPerHourDoc.pcsPerHour);
      setIsDekidakaLoading(false);
    } catch (error) {
      setIsDekidakaLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const getAllKpiData = async () => {
    try {
      const response = await axios.get("/api/kpiDataService/getAllKpiData");
      setKpiData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const contextValue: GetDataContextValue = {
    getDekidaka,
    getLastKpiDoc,
    getLastProfileDoc,
    getDekidakaById,
    getDekidakaSum,
    getAllKpiData,
    getDailyKpi,
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
    throw new Error("Error accessing context");
  }
  return context;
};
