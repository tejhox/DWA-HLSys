import React, { createContext, useContext, useState } from "react";
import {
  AllStateContextValue,
  KpiData,
  DekidakaData,
  DekidakaSumData,
} from "@/context/type/dataType";

const AllStateContext = createContext<AllStateContextValue | undefined>(
  undefined
);
export const AllStateProvider = ({ children }: any) => {
  const [userData, setUserData] = useState<any>(null);
  const [dateNow, setDateNow] = useState<any>();

  const [profileId, setProfileId] = useState<string>("");
  const [kpiId, setKpiId] = useState<string>("");
  const [dekidakaId, setDekidakaId] = useState<string>("");
  const [tableIndex, setTableIndex] = useState<number>(0);

  const [dekidakaData, setDekidakaData] = useState<DekidakaData[]>();
  const [dekidakaSumData, setDekidakaSumData] = useState<DekidakaSumData[]>();
  const [kpiData, setKpiData] = useState<KpiData[]>();

  const [line, setLine] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [shift, setShift] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const [plan, setPlan] = useState<number | undefined>(undefined);
  const [actual, setActual] = useState<number | undefined>(undefined);
  const [deviasi, setDeviasi] = useState<number | undefined>(undefined);
  const [lossTime, setLossTime] = useState<number | undefined>(undefined);

  const [man, setMan] = useState<number | undefined>(undefined);
  const [method, setMethod] = useState<number | undefined>(undefined);
  const [machine, setMachine] = useState<number | undefined>(undefined);
  const [material, setMaterial] = useState<number | undefined>(undefined);
  const [lossTimeNotes, setLossTimeNotes] = useState<string>("");

  const [totalPlan, setTotalPlan] = useState<number | undefined>(undefined);
  const [totalActual, setTotalActual] = useState<number | undefined>(undefined);
  const [totalDeviasi, setTotalDeviasi] = useState<number | undefined>(
    undefined
  );
  const [totalLossTime, setTotalLossTime] = useState<number | undefined>(
    undefined
  );
  const [totalWorkHour, setTotalWorkHour] = useState<number | undefined>(
    undefined
  );

  const [availableTime, setAvailableTime] = useState<number | undefined>(
    undefined
  );
  const [effectiveTime, setEffectiveTime] = useState<number | undefined>(
    undefined
  );
  const [efficiency, setEfficiency] = useState<number | undefined>(undefined);

  const [lossTimeKpi, setLossTimeKpi] = useState<number | undefined>();
  const [lossTimeRatio, setLossTimeRatio] = useState<number | undefined>();

  const [isModalDeleteProfileOpen, setIsModalDeleteProfileOpen] =
    useState<boolean>(false);
  const [isModalAddDekidakaOpen, setIsModalAddDekidakaOpen] =
    useState<boolean>(false);
  const [isModalUpdateDekidakaOpen, setIsModalUpdateDekidakaOpen] =
    useState<boolean>(false);
  const [isModalDeleteDekidakaOpen, setIsModalDeleteDekidakaOpen] =
    useState<boolean>(false);
  const [isModalLossTimeDetailsOpen, setIsModalLossTimeDetailsOpen] =
    useState<boolean>(false);

  const [isProfileLoading, setIsProfileLoading] = useState<boolean>(false);
  const [isDekidakaLoading, setIsDekidakaLoading] = useState<boolean>(false);
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);

  const [isInputFilled, setIsInputFilled] = useState<boolean>(false);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [isFormBlank, setIsFormBlank] = useState(false);
  const [isCheckBtnDisabled, setIsCheckBtnDisabled] = useState<boolean>(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false);
  const [isBtnClicked, setIsBtnClicked] = useState<boolean>(false);
  const [isSwitchProfileUi, setIsSwitchProfileUi] = useState<boolean>(false);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);

  const contextValue: AllStateContextValue = {
    dekidakaData,
    dekidakaSumData,
    kpiData,
    userData: userData,
    userDataId: userData ? userData.id : "",
    userDataName: userData ? userData.nama : "",
    userDataNik: userData ? userData.nik : "",
    tableIndex,
    profileId,
    kpiId,
    dekidakaId,
    dateNow,
    line,
    product,
    shift,
    date,
    plan,
    actual,
    deviasi,
    lossTime,
    man,
    method,
    machine,
    material,
    lossTimeNotes,
    totalPlan,
    totalActual,
    totalDeviasi,
    totalLossTime,
    totalWorkHour,
    availableTime,
    effectiveTime,
    efficiency,
    lossTimeKpi,
    lossTimeRatio,
    isInputDisabled,
    isInputFilled,
    isProfileLoading,
    isDekidakaLoading,
    isModalLoading,
    isFormBlank,
    isEditMode,
    isMenuOpen,
    isShowAlert,
    isBtnClicked,
    isBtnDisabled,
    isCheckBtnDisabled,
    isSwitchProfileUi,
    isModalUpdateDekidakaOpen,
    isModalDeleteDekidakaOpen,
    isModalDeleteProfileOpen,
    isModalAddDekidakaOpen,
    isModalLossTimeDetailsOpen,
    setDekidakaData,
    setDekidakaSumData,
    setKpiData,
    setProfileId,
    setDekidakaId,
    setKpiId,
    setLine,
    setProduct,
    setShift,
    setDate,
    setPlan,
    setActual,
    setDeviasi,
    setLossTime,
    setMan,
    setMethod,
    setMachine,
    setMaterial,
    setLossTimeNotes,
    setTotalPlan,
    setTotalActual,
    setTotalDeviasi,
    setTotalLossTime,
    setTotalWorkHour,
    setTableIndex,
    setIsInputDisabled,
    setIsInputFilled,
    setIsSwitchProfileUi,
    setIsEditMode,
    setIsMenuOpen,
    setIsShowAlert,
    setIsProfileLoading,
    setIsDekidakaLoading,
    setIsModalLoading,
    setIsFormBlank,
    setIsBtnClicked,
    setIsCheckBtnDisabled,
    setIsBtnDisabled,
    setUserData,
    setDateNow,
    setAvailableTime,
    setEffectiveTime,
    setEfficiency,
    setLossTimeKpi,
    setLossTimeRatio,
    setIsModalAddDekidakaOpen,
    setIsModalLossTimeDetailsOpen,
    setIsModalUpdateDekidakaOpen,
    setIsModalDeleteDekidakaOpen,
    setIsModalDeleteProfileOpen,
  };

  return (
    <AllStateContext.Provider value={contextValue}>
      {children}
    </AllStateContext.Provider>
  );
};

export const useAllStateContext = () => {
  const context = useContext(AllStateContext);
  if (!context) {
    throw new Error("Error accessing context");
  }
  return context;
};
