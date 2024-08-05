import React, { createContext, useContext, useState } from "react";
import {
  AllStateContextValue,
  KpiData,
  DekidakaData,
  DekidakaSumData,
  ProfileData,
  UserData,
  AllDekidakaSumData,
} from "@/context/type/dataType";

const AllStateContext = createContext<AllStateContextValue | undefined>(
  undefined
);
export const AllStateProvider = ({ children }: any) => {
  const [userData, setUserData] = useState<any>(null);

  const [dateNow, setDateNow] = useState<any>();

  const [profileId, setProfileId] = useState<string | undefined>("");
  const [kpiId, setKpiId] = useState<string>("");
  const [dekidakaId, setDekidakaId] = useState<string>("");
  const [tableIndex, setTableIndex] = useState<number>(0);

  const [dekidakaData, setDekidakaData] = useState<DekidakaData[] | null>([]);
  const [kpiData, setKpiData] = useState<KpiData[] | null>([]);
  const [filteredKpiData, setFilteredKpiData] = useState<KpiData[] | null>([]);
  const [profileData, setProfileData] = useState<ProfileData[] | null>([]);
  const [dekidakaSumData, setDekidakaSumData] =
    useState<DekidakaSumData | null>(null);
  const [allDekidakaSumData, setAllDekidakaSumData] = useState<
    AllDekidakaSumData[] | null
  >(null);

  const [lineName, setLineName] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");

  const [line, setLine] = useState<string>("");
  const [leader, setLeader] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [shift, setShift] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const [plan, setPlan] = useState<number | null | undefined>(null);
  const [actual, setActual] = useState<number | null | undefined>(null);
  const [deviasi, setDeviasi] = useState<number | null | undefined>(null);
  const [lossTime, setLossTime] = useState<number | null | undefined>(null);

  const [man, setMan] = useState<number | null | undefined>(null);
  const [method, setMethod] = useState<number | null | undefined>(null);
  const [machine, setMachine] = useState<number | null | undefined>(null);
  const [material, setMaterial] = useState<number | null | undefined>(null);
  const [manNote, setManNote] = useState<string>("");
  const [methodNote, setMethodNote] = useState<string>("");
  const [machineNote, setMachineNote] = useState<string>("");
  const [materialNote, setMaterialNote] = useState<string>("");

  const [totalPlan, setTotalPlan] = useState<number | null | undefined>(null);
  const [totalActual, setTotalActual] = useState<number | null | undefined>(
    null
  );
  const [totalDeviasi, setTotalDeviasi] = useState<number | null | undefined>(
    null
  );
  const [totalLossTime, setTotalLossTime] = useState<number | null | undefined>(
    null
  );
  const [totalWorkHour, setTotalWorkHour] = useState<number | null | undefined>(
    null
  );

  const [availableTime, setAvailableTime] = useState<number | null | undefined>(
    null
  );
  const [effectiveTime, setEffectiveTime] = useState<number | null | undefined>(
    null
  );
  const [efficiency, setEfficiency] = useState<number | null | undefined>(null);
  const [lossTimeKpi, setLossTimeKpi] = useState<number | null | undefined>(
    null
  );
  const [lossTimeRatio, setLossTimeRatio] = useState<number | null | undefined>(
    null
  );
  const [effectiveHour, setEffectiveHour] = useState<number | null | undefined>(
    null
  );
  const [totalProduction, setTotalProduction] = useState<
    number | null | undefined
  >(null);
  const [pcsPerHour, setPcsPerHour] = useState<number | null | undefined>(null);

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

  const [isKpiBtnActive, setIsKpiBtnActive] = useState<boolean>(false);
  const [isPlanRecordBtnActive, setIsPlanRecordBtnActive] =
    useState<boolean>(false);
  const [isMonitoringBtnActive, setIsMonitoringBtnActive] =
    useState<boolean>(false);
  const [isMonitoringSubBtnActive, setIsMonitoringSubBtnActive] =
    useState<boolean>(false);
  const [isEr01BtnActive, setIsEr01BtnActive] = useState<boolean>(false);
  const [isEr02BtnActive, setIsEr02BtnActive] = useState<boolean>(false);
  const [isEr03BtnActive, setIsEr03BtnActive] = useState<boolean>(false);
  const [isEr150BtnActive, setIsEr150BtnActive] = useState<boolean>(false);

  const contextValue: AllStateContextValue = {
    dekidakaData,
    dekidakaSumData,
    allDekidakaSumData,
    profileData,
    kpiData,
    filteredKpiData,
    userData: userData,
    userDataId: userData ? userData.id : "",
    userDataName: userData ? userData.nama : "",
    userDataNik: userData ? userData.nik : "",
    tableIndex,
    profileId,
    kpiId,
    dekidakaId,
    dateNow,
    lineName,
    groupName,
    line,
    product,
    shift,
    date,
    leader,
    plan,
    actual,
    deviasi,
    lossTime,
    man,
    method,
    machine,
    material,
    manNote,
    methodNote,
    machineNote,
    materialNote,
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
    totalProduction,
    effectiveHour,
    pcsPerHour,
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
    isKpiBtnActive,
    isPlanRecordBtnActive,
    isEr01BtnActive,
    isEr02BtnActive,
    isEr03BtnActive,
    isEr150BtnActive,
    setDekidakaData,
    setAllDekidakaSumData,
    setDekidakaSumData,
    setProfileData,
    setKpiData,
    setFilteredKpiData,
    setProfileId,
    setDekidakaId,
    setKpiId,
    setLineName,
    setGroupName,
    setLine,
    setProduct,
    setShift,
    setDate,
    setLeader,
    setPlan,
    setActual,
    setDeviasi,
    setLossTime,
    setMan,
    setMethod,
    setMachine,
    setMaterial,
    setManNote,
    setMethodNote,
    setMachineNote,
    setMaterialNote,
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
    setTotalProduction,
    setEffectiveHour,
    setPcsPerHour,
    setIsModalAddDekidakaOpen,
    setIsModalLossTimeDetailsOpen,
    setIsModalUpdateDekidakaOpen,
    setIsModalDeleteDekidakaOpen,
    setIsModalDeleteProfileOpen,
    isMonitoringBtnActive,
    setIsMonitoringBtnActive,
    setIsKpiBtnActive,
    setIsPlanRecordBtnActive,
    setIsEr01BtnActive,
    setIsEr02BtnActive,
    setIsEr03BtnActive,
    setIsEr150BtnActive,
    isMonitoringSubBtnActive,
    setIsMonitoringSubBtnActive,
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
