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
  plan: number | null | undefined;
  actual: number | null | undefined;
  deviasi: number | null | undefined;
  lossTime: number | null | undefined;
};

export type DekidakaSumData = {
  id: string;
  totalPlan: number | null | undefined;
  totalActual: number | null | undefined;
  totalDeviasi: number | null | undefined;
  totalLossTime: number | null | undefined;
};

export type EfficiencyDoc = {
  availableTime: number | null | undefined;
  effectiveTime: number | null | undefined;
  efficiency: number | null | undefined;
};

export type LossTimeDoc = {
  availableTime: number | null | undefined;
  lossTimeKpi: number | null | undefined;
  lossTimeRatio: number | null | undefined;
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
  setUserData: (value: any) => void;
  setDateNow: (value: any) => void;
  setAvailableTime: (value: number | null | undefined) => void;
  setEffectiveTime: (value: number | null | undefined) => void;
  setEfficiency: (value: number | null | undefined) => void;
  setLossTimeKpi: (value: number | null | undefined) => void;
  setLossTimeRatio: (value: number | null | undefined) => void;
  setIsModalAddDekidakaOpen: (value: boolean) => void;
  setIsModalLossTimeDetailsOpen: (value: boolean) => void;
  setIsModalUpdateDekidakaOpen: (value: boolean) => void;
  setIsModalDeleteDekidakaOpen: (value: boolean) => void;
  setIsModalDeleteProfileOpen: (value: boolean) => void;
};
