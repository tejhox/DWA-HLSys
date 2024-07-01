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
  const { getDekidaka, getDekidakaSum, getDailyKpi } = useGetDataContext();
  const { setKpi } = useKpiContext();
  const {
    plan,
    actual,
    setPlan,
    setActual,
    man,
    method,
    machine,
    material,
    manNote,
    methodNote,
    machineNote,
    materialNote,
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
    isModalLossTimeDetailsOpen,
    setIsModalLossTimeDetailsOpen,
    setIsShowAlert,
    setMan,
    setMethod,
    setMachine,
    setMaterial,
    setManNote,
    setMethodNote,
    setMachineNote,
    setMaterialNote,
  } = useAllStateContext();

  const handleAddDekidakaModal = () => {
    setPlan(null);
    setActual(null);
    setMan(null);
    setMethod(null);
    setMachine(null);
    setMaterial(null);
    setManNote("");
    setMethodNote("");
    setMachineNote("");
    setMaterialNote("");
    setIsModalAddDekidakaOpen(!isModalAddDekidakaOpen);
  };

  const handleLossTimeDetailsModal = () => {
    setIsModalLossTimeDetailsOpen(!isModalLossTimeDetailsOpen);
  };

  const handleUpdateDekidakaModal = () => {
    setPlan(null);
    setActual(null);
    setMan(null);
    setMethod(null);
    setMachine(null);
    setMaterial(null);
    setManNote("");
    setMethodNote("");
    setMachineNote("");
    setMaterialNote("");
    setIsModalUpdateDekidakaOpen(!isModalUpdateDekidakaOpen);
  };

  const handleDeleteDekidakaModal = () => {
    setIsModalDeleteDekidakaOpen(!isModalDeleteDekidakaOpen);
  };

  const calculatedDeviasiValue: number | null | undefined = calculateDeviasi(
    plan,
    actual
  );

  const calculatedlossTimeValue: number | null | undefined = calculateLossTime(
    dekidakaData,
    plan,
    actual
  );

  const calculatedlossTimeValueById: number | null | undefined =
    calculateLossTimeById(dekidakaData, plan, actual, tableIndex);

  const addDekidaka = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        (plan !== undefined && actual !== undefined) ||
        plan === 0 ||
        actual === 0
      ) {
        const workHourValue: number = 60;
        const deviasiValue = calculateDeviasi(plan, actual);
        const lossTimeValue = calculateLossTime(dekidakaData, plan, actual);
        const apiTask = async () => {
          setIsShowAlert(false);
          setIsBtnDisabled(true);
          setIsModalLoading(true);
          await axios.post(`/api/dekidakaDataService/addDekidaka`, {
            docId: profileId,
            workHour: workHourValue,
            plan,
            actual,
            deviasi: deviasiValue,
            lossTime: lossTimeValue,
            man: lossTimeValue === 0 ? 0 : man,
            method: lossTimeValue === 0 ? 0 : method,
            machine: lossTimeValue === 0 ? 0 : machine,
            material: lossTimeValue === 0 ? 0 : material,
            manNote: lossTimeValue === 0 ? "" : manNote,
            methodNote: lossTimeValue === 0 ? "" : methodNote,
            machineNote: lossTimeValue === 0 ? "" : machineNote,
            materialNote: lossTimeValue === 0 ? "" : materialNote,
          });
          setIsModalLoading(false);
          setIsModalAddDekidakaOpen(false);
          setIsBtnDisabled(false);
          setIsFormBlank(false);
          await sumDekidaka();
        };

        if (lossTimeValue === 0) {
          apiTask();
        } else {
          if (
            !man &&
            !manNote &&
            !method &&
            !methodNote &&
            !machine &&
            !machineNote &&
            !material &&
            !materialNote
          ) {
            setIsShowAlert(true);
          } else {
            apiTask();
          }
        }
      }
    } catch (error) {
      setIsModalLoading(false);
      setIsBtnDisabled(false);
      console.error("Error adding data:", error);
    }
  };

  const sumDekidaka = async () => {
    try {
      await axios.post(`/api/dekidakaDataService/sumDekidaka`, {
        docId: profileId,
      });
      await getDekidakaSum();
      await getDekidaka();
      await setKpi();
      await getDailyKpi();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateDekidaka = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const lossTimeValueById = calculateLossTimeById(
        dekidakaData,
        plan,
        actual,
        tableIndex
      );
      const apiTask = async () => {
        setIsModalLoading(true);
        setIsBtnDisabled(true);
        setIsShowAlert(false);
        await axios.patch("/api/dekidakaDataService/updateDekidaka", {
          docId: profileId,
          subDocId: dekidakaId,
          plan: plan,
          actual: actual,
          deviasi: calculatedDeviasiValue,
          lossTime: lossTimeValueById,
          man: lossTimeValueById === 0 ? 0 : man,
          method: lossTimeValueById === 0 ? 0 : method,
          machine: lossTimeValueById === 0 ? 0 : machine,
          material: lossTimeValueById === 0 ? 0 : material,
          manNote: lossTimeValueById === 0 ? "" : manNote,
          methodNote: lossTimeValueById === 0 ? "" : methodNote,
          machineNote: lossTimeValueById === 0 ? "" : machineNote,
          materialNote: lossTimeValueById === 0 ? "" : materialNote,
        });
        setIsModalLoading(false);
        setIsBtnDisabled(false);
        setIsModalUpdateDekidakaOpen(false);
        await sumDekidaka();
        setPlan(null);
        setActual(null);
        setMan(null);
        setMethod(null);
        setMachine(null);
        setMaterial(null);
        setManNote("");
        setMethodNote("");
        setMachineNote("");
        setMaterialNote("");
      };
      if (lossTimeValueById === 0) {
        apiTask();
      } else {
        if (
          !man &&
          !manNote &&
          !method &&
          !methodNote &&
          !machine &&
          !machineNote &&
          !material &&
          !materialNote
        ) {
          setIsShowAlert(true);
        } else {
          apiTask();
        }
      }
    } catch (error) {
      setIsModalLoading(false);
      setIsBtnDisabled(false);
      console.error("Error fetching data:", error);
    }
  };

  const deleteDekidaka = async () => {
    setIsModalLoading(true);
    try {
      await axios.delete(
        `/api/dekidakaDataService/deleteDekidaka?docId=${profileId}&subDocId=${dekidakaId}`
      );
      setIsModalLoading(false);
      setIsModalUpdateDekidakaOpen(false);
      setIsModalDeleteDekidakaOpen(false);
      setPlan(null);
      setActual(null);
      setMan(null);
      setMethod(null);
      setMachine(null);
      setMaterial(null);
      setManNote("");
      setMethodNote("");
      setMachineNote("");
      setMaterialNote("");
      await sumDekidaka();
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
    handleLossTimeDetailsModal,
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
    throw new Error("Error accessing context");
  }
  return context;
};
