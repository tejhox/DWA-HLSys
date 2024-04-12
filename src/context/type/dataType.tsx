import { FormEvent } from "react";

export type ProfileData = {
  id: string;
  line: string;
  product: string;
  shift: string;
  date: string;
};

export type DekidakaData = {
  id: string;
  plan: number;
  actual: number;
  deviasi: number;
  lossTime: number;
};

export type DekidakaSumData = {
  id: string;
  totalPlan: number;
  totalActual: number;
  totalDeviasi: number;
  totalLossTime: number;
};

export type EfficiencyDoc = {
  availableTime: number;
  effectiveTime: number;
  efficiency: number;
};

export type LossTimeDoc = {
  availableTime: number;
  lossTimeKpi: number;
  lossTimeRatio: number;
};

export type KpiData = {
  id: string;
  date: string;
  efficiencyDoc: EfficiencyDoc;
  lossTimeDoc: LossTimeDoc;
  group: string;
  leader: string;
  line: string;
};

export type UserData = {
  id: string;
  nama: string;
  nik: string;
  lastProfileId: string;
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
  calculatedlossTimeValue: number;
  calculatedlossTimeValueById: number | undefined;
  calculatedDeviasiValue: number;
  getDekidaka: () => Promise<void>;
  deleteDekidaka: () => Promise<void>;
  addDekidaka: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  updateDekidaka: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  handleAddDekidakaModal: () => void;
  handleUpdateDekidakaModal: () => void;
  handleDeleteDekidakaModal: () => void;
};

export type ModalFunctionContextValue = {
  modalAddDekidaka: () => React.ReactNode;
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
  getAllKpiData: () => Promise<void>;
  getDailyKpi: () => Promise<void>;
  getDekidakaById: (subDocId: string, index: number) => Promise<void>;
};

export type KpiContextValue = {
  setKpi: () => Promise<void>;
};

export type AllStateContextValue = {
  dekidakaData: DekidakaData[] | undefined;
  dekidakaSumData: DekidakaSumData[] | undefined;
  kpiData: KpiData[] | undefined;
  userData: UserData[] | undefined;
  userDataId: string;
  userDataName: string;
  userDataNik: string;
  tableIndex: number;
  profileId: string;
  kpiId: string;
  dekidakaId: string;
  dateNow: any;
  line: string;
  product: string;
  shift: string;
  date: string;
  plan: number | undefined;
  actual: number | undefined;
  deviasi: number | undefined;
  lossTime: number | undefined;
  totalPlan: number | undefined;
  totalActual: number | undefined;
  totalDeviasi: number | undefined;
  totalLossTime: number | undefined;
  totalWorkHour: number | undefined;
  availableTime: number | undefined;
  effectiveTime: number | undefined;
  efficiency: number | undefined;
  lossTimeKpi: number | undefined;
  lossTimeRatio: number | undefined;
  isInputDisabled: boolean;
  isInputFilled: boolean;
  isProfileLoading: boolean;
  isDekidakaLoading: boolean;
  isModalLoading: boolean;
  isFormBlank: boolean;
  isEditMode: boolean;
  isMenuOpen: boolean;
  isBtnClicked: boolean;
  isBtnDisabled: boolean;
  isCheckBtnDisabled: boolean;
  isSwitchProfileUi: boolean;
  isModalUpdateDekidakaOpen: boolean;
  isModalDeleteDekidakaOpen: boolean;
  isModalDeleteProfileOpen: boolean;
  isModalAddDekidakaOpen: boolean;
  setDekidakaData: (value: DekidakaData[]) => void;
  setDekidakaSumData: (value: DekidakaSumData[]) => void;
  setKpiData: (value: KpiData[]) => void;
  setProfileId: (value: string) => void;
  setDekidakaId: (value: string) => void;
  setKpiId: (value: string) => void;
  setLine: (value: string) => void;
  setProduct: (value: string) => void;
  setShift: (value: string) => void;
  setDate: (value: string) => void;
  setPlan: (value: number) => void;
  setActual: (value: number) => void;
  setDeviasi: (value: number) => void;
  setLossTime: (value: number) => void;
  setTotalPlan: (value: number) => void;
  setTotalActual: (value: number) => void;
  setTotalDeviasi: (value: number) => void;
  setTotalLossTime: (value: number) => void;
  setTotalWorkHour: (value: number) => void;
  setTableIndex: (value: number) => void;
  setIsInputDisabled: (value: boolean) => void;
  setIsInputFilled: (value: boolean) => void;
  setIsSwitchProfileUi: (value: boolean) => void;
  setIsEditMode: (value: boolean) => void;
  setIsMenuOpen: (value: boolean) => void;
  setIsProfileLoading: (value: boolean) => void;
  setIsDekidakaLoading: (value: boolean) => void;
  setIsModalLoading: (value: boolean) => void;
  setIsFormBlank: (value: boolean) => void;
  setIsBtnClicked: (value: boolean) => void;
  setIsCheckBtnDisabled: (value: boolean) => void;
  setIsBtnDisabled: (value: boolean) => void;
  setUserData: (value: any) => void;
  setDateNow: (value: any) => void;
  setAvailableTime: (value: number) => void;
  setEffectiveTime: (value: number) => void;
  setEfficiency: (value: number) => void;
  setLossTimeKpi: (value: number) => void;
  setLossTimeRatio: (value: number) => void;
  setIsModalAddDekidakaOpen: (value: boolean) => void;
  setIsModalUpdateDekidakaOpen: (value: boolean) => void;
  setIsModalDeleteDekidakaOpen: (value: boolean) => void;
  setIsModalDeleteProfileOpen: (value: boolean) => void;
};
