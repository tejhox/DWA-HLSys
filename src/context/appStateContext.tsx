import React, { createContext, useContext, useState } from "react";
import {
  AppStateContextValue,
  KpiData,
  DekidakaData,
} from "@/context/type/dataType";

const AppStateContext = createContext<AppStateContextValue | undefined>(
  undefined
);
export const AppStateProvider = ({ children }: any) => {
  const [userData, setUserData] = useState<any>(null);
  const [dateNow, setDateNow] = useState<any>();

  const [profileId, setProfileId] = useState<string>("");
  const [kpiId, setKpiId] = useState<string>("");
  const [dekidakaId, setDekidakaId] = useState<string>("");
  const [tableIndex, setTableIndex] = useState<number>(0);

  const [dekidakaData, setDekidakaData] = useState<DekidakaData[]>();
  const [kpiData, setKpiData] = useState<KpiData[]>();

  const [line, setLine] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const [shift, setShift] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const [plan, setPlan] = useState<number | undefined>(undefined);
  const [actual, setActual] = useState<number | undefined>(undefined);
  const [deviasi, setDeviasi] = useState<number | undefined>(undefined);
  const [lossTime, setLossTime] = useState<number | undefined>(undefined);

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

  const [isInputFilled, setIsInputFilled] = useState<boolean>(false);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormBlank, setIsFormBlank] = useState(false);
  const [isCheckBtnDisabled, setIsCheckBtnDisabled] = useState<boolean>(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false);
  const [isBtnClicked, setIsBtnClicked] = useState<boolean>(false);
  const [isSwitchProfileUi, setIsSwitchProfileUi] = useState<boolean>(false);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const contextValue: AppStateContextValue = {
    dekidakaData,
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
    isLoading,
    isFormBlank,
    isEditMode,
    isMenuOpen,
    isBtnClicked,
    isBtnDisabled,
    isCheckBtnDisabled,
    isSwitchProfileUi,
    isModalUpdateDekidakaOpen,
    isModalDeleteDekidakaOpen,
    isModalDeleteProfileOpen,
    isModalAddDekidakaOpen,
    setDekidakaData,
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
    setIsLoading,
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
    setIsModalUpdateDekidakaOpen,
    setIsModalDeleteDekidakaOpen,
    setIsModalDeleteProfileOpen,
  };

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppStateContext = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useGetDataContext must be used within a ProfileProvider");
  }
  return context;
};
