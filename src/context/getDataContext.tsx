import React, { createContext, useContext } from "react";
import axios from "axios";
import { useAllStateContext } from "./allStateContext";
import { GetDataContextValue, KpiData, ProfileData } from "./type/dataType";

const GetDataContext = createContext<GetDataContextValue | undefined>(
  undefined
);

export const GetDataProvider = ({ children }: any) => {
  const {
    profileId,
    setProfileData,
    setProfileId,
    setLineName,
    setLine,
    setProduct,
    setShift,
    setDate,
    setPlan,
    setActual,
    setDeviasi,
    setLossTime,
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
    setTotalPlan,
    setTotalActual,
    setTotalDeviasi,
    setTotalLossTime,
    setTotalWorkHour,
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
    setAllDekidakaSumData,
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
        `/api/dekidakaDataService/getDekidaka?profileId=${profileId}`
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
        `/api/dekidakaDataService/getDekidakaSum?profileId=${profileId}`
      );
      setDekidakaSumData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllDekidakaSumData = async () => {
    try {
      const response = await axios.get(
        "/api/dekidakaDataService/getAllDekidakaSumData"
      );
      setAllDekidakaSumData(response.data);
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

  const getFilteredMonitoringData = async (lineName: string) => {
    try {
      setIsDekidakaLoading(true);
      const filteredDataResponse = await axios.get(
        "/api/profileDataService/getAllProfileData"
      );
      const filteredAndSortedData: ProfileData[] = filteredDataResponse.data
        .filter((item: ProfileData) => item.line === lineName)
        .sort((a: any, b: any) => {
          const timeA = a.time.seconds ?? 0;
          const timeB = b.time.seconds ?? 0;
          return timeB - timeA;
        });
      const id = filteredAndSortedData[0]?.id;
      setProfileData(filteredAndSortedData);
      try {
        const getDekidakaResponse = await axios.get(
          `/api/dekidakaDataService/getDekidaka?profileId=${id}`
        );
        setDekidakaData(getDekidakaResponse.data);

        const getDekidakaSumResponse = await axios.get(
          `/api/dekidakaDataService/getDekidakaSum?profileId=${id}`
        );
        setDekidakaSumData(getDekidakaSumResponse.data);
      } catch (error) {
        console.log(error);
      }
      setIsDekidakaLoading(false);
    } catch (error) {
      setIsDekidakaLoading(false);
      console.error("Error fetching profile data:", error);
    }
  };

  const getFilteredMonitoringKpiData = async (lineName: string) => {
    try {
      setLineName(lineName);
      setIsDekidakaLoading(true);
      const response = await axios.get("/api/kpiDataService/getAllKpiData");
      const filteredAndSortedKpi: KpiData[] = response.data
        .filter((item: KpiData) => item.line === lineName)
        .sort((a: any, b: any) => {
          const timeA = a.time.seconds ?? 0;
          const timeB = b.time.seconds ?? 0;
          return timeB - timeA;
        });
      if (filteredAndSortedKpi.length > 0) {
        setKpiData(filteredAndSortedKpi);
      } else {
        setKpiData(null);
      }
      setIsDekidakaLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getKpiDataByLine = async (lineName: string) => {
    try {
      const response = await axios.get("/api/kpiDataService/getAllKpiData");
      const kpiDataByLine: KpiData[] = response.data.filter(
        (item: KpiData) => item.line === lineName
      );
      setKpiData(kpiDataByLine);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getKpiDataByGroup = async (lineName: string, groupName: string) => {
    try {
      const response = await axios.get("/api/kpiDataService/getAllKpiData");
      const kpiDataByLine: KpiData[] = response.data.filter(
        (item: KpiData) => item.line === lineName
      );
      const kpiDataByGroup: KpiData[] = kpiDataByLine.filter(
        (item: KpiData) => item.group === groupName
      );
      setKpiData(kpiDataByGroup);
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
    getAllDekidakaSumData,
    getAllKpiData,
    getDailyKpi,
    getFilteredMonitoringData,
    getFilteredMonitoringKpiData,
    getKpiDataByLine,
    getKpiDataByGroup,
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
