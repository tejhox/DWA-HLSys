import { FormEvent } from "react";

export type ProfileData = {
  id: string | undefined;
  group: string | undefined;
  line: string | undefined;
  leader: string | undefined;
  product: string | undefined;
  time: { seconds: number | undefined; nanoseconds: number | undefined };
  shift: string | undefined;
  date: string | undefined;
};

export type DekidakaData = {
  id: string;
  plan: number | null | undefined;
  actual: number | null | undefined;
  deviasi: number | null | undefined;
  lossTime: number | null | undefined;
  lossTimeDetails: {
    manCat: {
      man: number | null | undefined;
      manNote: string | null | undefined;
    };
    machineCat: {
      machine: number | null | undefined;
      machineNote: string | null | undefined;
    };
    methodCat: {
      method: number | null | undefined;
      methodNote: string | null | undefined;
    };
    materialCat: {
      material: number | null | undefined;
      materialNote: string | null | undefined;
    };
  };
};

export type DekidakaSumData = {
  id?: string;
  totalPlan: number | null | undefined;
  totalActual: number | null | undefined;
  totalDeviasi: number | null | undefined;
  totalLossTime: number | null | undefined;
};

export type AllDekidakaSumData = {
  id: string;
  totalPlan: number | null | undefined;
  totalActual: number | null | undefined;
  totalDeviasi: number | null | undefined;
  totalLossTime: number | null | undefined;
  totalWorkHour: number | null | undefined;
};

export type KpiData = {
  id: string;
  date: string;
  efficiencyDoc: {
    availableTime: number | null | undefined;
    effectiveTime: number | null | undefined;
    efficiency: number | null | undefined;
  };
  lossTimeDoc: {
    availableTime: number | null | undefined;
    lossTimeKpi: number | null | undefined;
    lossTimeRatio: number | null | undefined;
  };
  pcsPerHourDoc: {
    effectiveHour: number | null | undefined;
    totalProduction: number | null | undefined;
    pcsPerHour: number | null | undefined;
  };
  productivityDoc: {
    actualPrd: number | null | undefined;
    hour: number | null | undefined;
    man: number | null | undefined;
    manHour: number | null | undefined;
    unitPerManHrAct: number | null | undefined;
  };
  cycleTimeActualDoc: {
    cycleTimeAct: number | null | undefined;
    effectiveTime: number | null | undefined;
    totalProduction: number | null | undefined;
  };
  group: string;
  leader: string;
  line: string;
};

export type UserData = {
  id: string | null | undefined;
  nama: string | null | undefined;
  nik: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

export type ProfileContextValue = {
  addProfile: () => Promise<void>;
  updateProfile: () => Promise<void>;
  deleteProfile: () => Promise<void>;
  toggleOpenMenu: () => void;
  toggleEditProfile: () => void;
  handleShowWarning: () => void;
  handleModalDeleteProfile: () => void;
  newProfile: () => void;
};

export type DekidakaContextValue = {
  calculatedlossTimeValue: number | null | undefined;
  calculatedlossTimeValueById: number | null | undefined;
  calculatedDeviasiValue: number | null | undefined;
  getDekidaka: () => Promise<void>;
  deleteDekidaka: () => Promise<void>;
  addDekidaka: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  updateDekidaka: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleAddDekidakaModal: () => void;
  handleLossTimeDetailsModal: () => void;
  handleUpdateDekidakaModal: () => void;
  handleDeleteDekidakaModal: () => void;
};

export type ModalFunctionContextValue = {
  modalAddDekidaka: () => React.ReactNode;
  modalLossTimeDetails: () => React.ReactNode;
  modalUpdateDekidaka: () => React.ReactNode;
  modalDeleteProfileConfirmation: () => React.ReactNode;
  modalDeleteDekidakaConfirmation: () => React.ReactNode;
  modalBlankFormWarning: () => React.ReactNode;
};

export type GetDataContextValue = {
  getLastProfileDoc: () => Promise<void>;
  getLastKpiDoc: () => Promise<void>;
  getDekidaka: () => Promise<void>;
  getDekidakaSum: () => Promise<void>;
  getAllDekidakaSumData: () => Promise<void>;
  getAllKpiData: () => Promise<void>;
  getDailyKpi: () => Promise<void>;
  getFilteredMonitoringData: (lineName: string) => Promise<void>;
  getFilteredMonitoringKpiData: (lineName: string) => Promise<void>;
  getKpiDataByLine: (lineName: string) => Promise<void>;
  getKpiDataByGroup: (lineName: string, groupName: string) => Promise<void>;
  getDekidakaById: (subDocId: string, index: number) => Promise<void>;
};

export type KpiContextValue = {
  setKpi: () => Promise<void>;
};

export type AllStateContextValue = {
  userData: any;
  profileData: ProfileData[] | null;
  dekidakaData: DekidakaData[] | null;
  kpiData: KpiData[] | null;
  filteredKpiData: KpiData[] | null;
  dekidakaSumData: DekidakaSumData | null;
  allDekidakaSumData: AllDekidakaSumData[] | null;
  userDataId: string | null | undefined;
  userDataName: string | null | undefined;
  userDataNik: string | null | undefined;
  tableIndex: number;
  profileId: string | undefined;
  kpiId: string;
  dekidakaId: string;
  dateNow: any;
  lineName: string;
  groupName: string;
  line: string;
  product: string;
  shift: string;
  date: string;
  leader: string;
  plan: number | null | undefined;
  actual: number | null | undefined;
  deviasi: number | null | undefined;
  lossTime: number | null | undefined;
  man: number | null | undefined;
  method: number | null | undefined;
  machine: number | null | undefined;
  material: number | null | undefined;
  manNote: string;
  methodNote: string;
  machineNote: string;
  materialNote: string;
  totalPlan: number | null | undefined;
  totalActual: number | null | undefined;
  totalDeviasi: number | null | undefined;
  totalLossTime: number | null | undefined;
  totalWorkHour: number | null | undefined;
  availableTime: number | null | undefined;
  effectiveTime: number | null | undefined;
  efficiency: number | null | undefined;
  lossTimeKpi: number | null | undefined;
  lossTimeRatio: number | null | undefined;
  totalProduction: number | null | undefined;
  effectiveHour: number | null | undefined;
  pcsPerHour: number | null | undefined;
  isInputDisabled: boolean;
  isInputFilled: boolean;
  isProfileLoading: boolean;
  isDekidakaLoading: boolean;
  isModalLoading: boolean;
  isFormBlank: boolean;
  isEditMode: boolean;
  isMenuOpen: boolean;
  isShowAlert: boolean;
  isBtnClicked: boolean;
  isBtnDisabled: boolean;
  isCheckBtnDisabled: boolean;
  isSwitchProfileUi: boolean;
  isModalAddDekidakaOpen: boolean;
  isModalLossTimeDetailsOpen: boolean;
  isModalUpdateDekidakaOpen: boolean;
  isModalDeleteDekidakaOpen: boolean;
  isModalDeleteProfileOpen: boolean;
  isMonitoringBtnActive: boolean;
  isPlanRecordBtnActive: boolean;
  isKpiBtnActive: boolean;
  isEr01BtnActive: boolean;
  isEr02BtnActive: boolean;
  isEr03BtnActive: boolean;
  isEr150BtnActive: boolean;
  isMonitoringSubBtnActive: boolean;
  setUserData: (value: any) => void;
  setProfileData: (value: ProfileData[] | null) => void;
  setKpiData: (value: KpiData[] | null) => void;
  setFilteredKpiData: (value: KpiData[] | null) => void;
  setDekidakaData: (value: DekidakaData[] | null) => void;
  setDekidakaSumData: (value: DekidakaSumData | null) => void;
  setAllDekidakaSumData: (value: AllDekidakaSumData[] | null) => void;
  setIsMonitoringBtnActive: (value: boolean) => void;
  setProfileId: (value: string | undefined) => void;
  setDekidakaId: (value: string) => void;
  setKpiId: (value: string) => void;
  setLineName: (value: string) => void;
  setGroupName: (value: string) => void;
  setLine: (value: string) => void;
  setProduct: (value: string) => void;
  setShift: (value: string) => void;
  setDate: (value: string) => void;
  setLeader: (value: string) => void;
  setPlan: (value: number | null | undefined) => void;
  setActual: (value: number | null | undefined) => void;
  setDeviasi: (value: number | null | undefined) => void;
  setLossTime: (value: number | null | undefined) => void;
  setMan: (value: number | null | undefined) => void;
  setMethod: (value: number | null | undefined) => void;
  setMachine: (value: number | null | undefined) => void;
  setMaterial: (value: number | null | undefined) => void;
  setManNote: (value: string) => void;
  setMethodNote: (value: string) => void;
  setMachineNote: (value: string) => void;
  setMaterialNote: (value: string) => void;
  setTotalPlan: (value: number | null | undefined) => void;
  setTotalActual: (value: number | null | undefined) => void;
  setTotalDeviasi: (value: number | null | undefined) => void;
  setTotalLossTime: (value: number | null | undefined) => void;
  setTotalWorkHour: (value: number | null | undefined) => void;
  setTableIndex: (value: number) => void;
  setIsInputDisabled: (value: boolean) => void;
  setIsInputFilled: (value: boolean) => void;
  setIsSwitchProfileUi: (value: boolean) => void;
  setIsEditMode: (value: boolean) => void;
  setIsMenuOpen: (value: boolean) => void;
  setIsShowAlert: (value: boolean) => void;
  setIsProfileLoading: (value: boolean) => void;
  setIsDekidakaLoading: (value: boolean) => void;
  setIsModalLoading: (value: boolean) => void;
  setIsFormBlank: (value: boolean) => void;
  setIsBtnClicked: (value: boolean) => void;
  setIsCheckBtnDisabled: (value: boolean) => void;
  setIsBtnDisabled: (value: boolean) => void;
  setDateNow: (value: any) => void;
  setAvailableTime: (value: number | null | undefined) => void;
  setEffectiveTime: (value: number | null | undefined) => void;
  setEfficiency: (value: number | null | undefined) => void;
  setLossTimeKpi: (value: number | null | undefined) => void;
  setLossTimeRatio: (value: number | null | undefined) => void;
  setTotalProduction: (value: number | null | undefined) => void;
  setEffectiveHour: (value: number | null | undefined) => void;
  setPcsPerHour: (value: number | null | undefined) => void;
  setIsModalAddDekidakaOpen: (value: boolean) => void;
  setIsModalLossTimeDetailsOpen: (value: boolean) => void;
  setIsModalUpdateDekidakaOpen: (value: boolean) => void;
  setIsModalDeleteDekidakaOpen: (value: boolean) => void;
  setIsModalDeleteProfileOpen: (value: boolean) => void;
  setIsPlanRecordBtnActive: (value: boolean) => void;
  setIsKpiBtnActive: (value: boolean) => void;
  setIsEr01BtnActive: (value: boolean) => void;
  setIsEr02BtnActive: (value: boolean) => void;
  setIsEr03BtnActive: (value: boolean) => void;
  setIsEr150BtnActive: (value: boolean) => void;
  setIsMonitoringSubBtnActive: (value: boolean) => void;
};
