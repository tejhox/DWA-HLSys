import axios from "axios";
import React, { createContext, useContext } from "react";
import { FormEvent } from "react";
import { useGetDataContext } from "./getDataContext";
import { useKpiContext } from "./kpiContext";
import {
  calculateDeviasi,
  calculateLossTime,
  useLossTimeCalculation,
} from "@/utils/dekidakaCalculation";
import { DekidakaContextValue } from "./type/dataType";
import { useAllStateContext } from "./allStateContext";

const DekidakaContext = createContext<DekidakaContextValue | undefined>(
  undefined
);

export const DekidakaProvider = ({ children }: any) => {
  const { calculateLossTimeById } = useLossTimeCalculation();
  const { getDekidaka, getDekidakaSum } = useGetDataContext();
  const { setKpi } = useKpiContext();
  const {
    plan,
    actual,
    dekidakaId,
    tableIndex,
    dekidakaData,
    isModalUpdateDekidakaOpen,
    setIsModalUpdateDekidakaOpen,
    profileId,
    setIsModalLoading,
    setIsFormBlank,
    isModalAddDekidakaOpen,
    setIsModalAddDekidakaOpen,
    setIsModalDeleteDekidakaOpen,
    isModalDeleteDekidakaOpen,
    setIsBtnDisabled,
  } = useAllStateContext();

  const handleAddDekidakaModal = () => {
    setIsModalAddDekidakaOpen(!isModalAddDekidakaOpen);
  };
  const handleUpdateDekidakaModal = () => {
    setIsModalUpdateDekidakaOpen(!isModalUpdateDekidakaOpen);
  };
  const handleDeleteDekidakaModal = () => {
    setIsModalDeleteDekidakaOpen(!isModalDeleteDekidakaOpen);
  };

  const calculatedDeviasiValue: number = calculateDeviasi(plan, actual);

  const calculatedlossTimeValue: number = calculateLossTime(
    dekidakaData,
    plan,
    actual
  );

  const calculatedlossTimeValueById: number | undefined = calculateLossTimeById(
    dekidakaData,
    plan,
    actual,
    tableIndex
  );

  const addDekidaka = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalLoading(true);
    try {
      if (plan && actual) {
        setIsBtnDisabled(true);
        const workHourValue: number = 60;
        const deviasiValue = calculateDeviasi(plan, actual);
        const lossTimeValue = calculateLossTime(dekidakaData, plan, actual);
        await axios.post(`/api/dekidakaDataService/addDekidaka`, {
          docId: profileId,
          workHour: workHourValue,
          plan,
          actual,
          deviasi: deviasiValue,
          lossTime: lossTimeValue,
        });
        await sumDekidaka();
        setIsModalLoading(false);
        setIsModalAddDekidakaOpen(false);
        setIsBtnDisabled(false);
        setIsFormBlank(false);
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const sumDekidaka = async () => {
    try {
      await axios.post(`/api/dekidakaDataService/sumDekidaka`, {
        docId: profileId,
      });
      await getDekidakaSum();
      getDekidaka();
      setKpi();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateDekidaka = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalLoading(true);
    try {
      setIsBtnDisabled(true);
      const lossTimeValueById = calculateLossTimeById(
        dekidakaData,
        plan,
        actual,
        tableIndex
      );
      await axios.patch("/api/dekidakaDataService/updateDekidaka", {
        docId: profileId,
        subDocId: dekidakaId,
        plan: plan,
        actual: actual,
        deviasi: calculatedDeviasiValue,
        lossTime: lossTimeValueById,
      });
      await sumDekidaka();
      setIsModalLoading(false);
      setIsModalUpdateDekidakaOpen(false);
      setIsBtnDisabled(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteDekidaka = async () => {
    setIsModalLoading(true);
    try {
      await axios.delete(
        `/api/dekidakaDataService/deleteDekidaka?docId=${profileId}&subDocId=${dekidakaId}`
      );
      await sumDekidaka();
      setIsModalLoading(false);
      setIsModalUpdateDekidakaOpen(false);
      setIsModalDeleteDekidakaOpen(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const contextValue: DekidakaContextValue = {
    calculatedlossTimeValue,
    calculatedlossTimeValueById,
    calculatedDeviasiValue,
    getDekidaka,
    deleteDekidaka,
    updateDekidaka,
    handleAddDekidakaModal,
    handleUpdateDekidakaModal,
    handleDeleteDekidakaModal,
    addDekidaka,
  };

  return (
    <DekidakaContext.Provider value={contextValue}>
      {children}
    </DekidakaContext.Provider>
  );
};

export const useDekidakaContext = () => {
  const context = useContext(DekidakaContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
