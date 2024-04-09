import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useSessionContext } from "./sessionContext";

export type SubDekidaka = {
  id: string;
  plan: number;
  actual: number;
  deviasi: number;
  lossTime: number;
};

export type EfficiencyDoc = {
  availableTime: number;
  effectiveTime: number;
  efficiency: number;
};

export type KpiDoc = {
  id: string;
  date: string;
  efficiencyDoc: EfficiencyDoc;
  group: string;
  leader: string;
  line: string;
};

type GetDataContextValue = {
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
  profileId: string;
  kpiId: string;
  itemId: string;
  subDekidaka: SubDekidaka[] | undefined;
  kpiDoc: KpiDoc[] | undefined;
  tableIndex: number;
  isDisabled: boolean;
  isInputFilled: boolean;
  isModalUpdateOpen: boolean;
  isLoading: boolean;
  switchProfileUi: boolean;
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
  setIsDisabled: (value: boolean) => void;
  setIsInputFilled: (value: boolean) => void;
  setSwitchProfileUi: (value: boolean) => void;
  setProfileId: (value: string) => void;
  setKpiId: (value: string) => void;
  setIsModalUpdateOpen: (value: boolean) => void;
  getDekidaka: () => Promise<void>;
  getLastProfile: () => Promise<void>;
  getLastKpi: () => Promise<void>;
  getAllEfficiency: () => Promise<void>;
  getDekidakaById: (subDocId: string, index: number) => Promise<void>;
  getDekidakaSum: () => Promise<void>;
  getEfficiency: () => Promise<void>;
  newProfile: () => void;
};

const GetDataContext = createContext<GetDataContextValue | undefined>(
  undefined
);

export const GetDataProvider = ({ children }: any) => {
  const [line, setLine] = useState("");
  const [product, setProduct] = useState("");
  const [shift, setShift] = useState("");
  const [date, setDate] = useState("");
  const [plan, setPlan] = useState<number | undefined>();
  const [actual, setActual] = useState<number | undefined>();
  const [deviasi, setDeviasi] = useState<number | undefined>();
  const [lossTime, setLossTime] = useState<number | undefined>(0);

  const [totalPlan, setTotalPlan] = useState<number>();
  const [totalActual, setTotalActual] = useState<number>();
  const [totalDeviasi, setTotalDeviasi] = useState<number>();
  const [totalLossTime, setTotalLossTime] = useState<number>();
  const [totalWorkHour, setTotalWorkHour] = useState<number>();

  const [availableTime, setAvailableTime] = useState<number>();
  const [effectiveTime, setEffectiveTime] = useState<number>();
  const [efficiency, setEfficiency] = useState<number>();

  const [isInputFilled, setIsInputFilled] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [switchProfileUi, setSwitchProfileUi] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const [subDekidaka, setSubDekidaka] = useState<SubDekidaka[]>();
  const [kpiDoc, setKpiDoc] = useState<KpiDoc[]>();

  const [profileId, setProfileId] = useState("");
  const [kpiId, setKpiId] = useState("");
  const [itemId, setItemId] = useState<string>("");
  const [tableIndex, setTableIndex] = useState<number>(0);

  const { userDataName, session } = useSessionContext();

  const getLastProfile = async () => {
    try {
      const response = await axios.get(
        `/api/getLastProfile?name=${userDataName}`
      );
      const { docId } = response.data;
      setProfileId(docId);
      setLine(response.data.line);
      setProduct(response.data.product);
      setShift(response.data.shift);
      setDate(response.data.date);
      setIsInputFilled(true);
      setIsDisabled(true);
      setSwitchProfileUi(true);
    } catch {
      setLine("");
      setProduct("");
      setShift("");
      setDate("");
      setIsDisabled(false);
      setIsInputFilled(false);
    }
  };

  const getDekidakaSum = async () => {
    try {
      const response = await axios.get(
        `/api/getDekidakaSum?docId=${profileId}`
      );
      setTotalPlan(response.data.totalPlan);
      setTotalActual(response.data.totalActual);
      setTotalDeviasi(response.data.totalDeviasi);
      setTotalLossTime(response.data.totalLossTime);
      setTotalWorkHour(response.data.totalWorkHour);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDekidaka = async () => {
    try {
      setIsLoading(true);
      if (session && userDataName) {
        const lastProfileResponse = await axios.get(
          `/api/getLastProfile?name=${userDataName}`
        );
        const { docId } = lastProfileResponse.data;
        setProfileId(docId);

        const dekidakaResponse = await axios.get(
          `/api/getDekidaka?docId=${docId}`
        );
        setSubDekidaka(dekidakaResponse.data);

        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const getDekidakaById = async (itemId: string, index: number) => {
    try {
      setIsModalUpdateOpen(true);
      const response = await axios.get(
        `/api/getDekidakaById?docId=${profileId}&subDocId=${itemId}`
      );
      if (response.data) {
        setTableIndex(index);
        setPlan(response.data.plan);
        setActual(response.data.actual);
        setDeviasi(response.data.deviasi);
        setLossTime(response.data.lossTime);
        setItemId(response.data.id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getLastKpi = async () => {
    try {
      const response = await axios.get(`/api/getLastKpi?name=${userDataName}`);
      const { kpiDocId } = response.data;
      setKpiId(kpiDocId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getEfficiency = async () => {
    try {
      if (session && userDataName) {
        const lastKpiResponse = await axios.get(
          `/api/getLastKpi?name=${userDataName}`
        );
        const { kpiDocId } = lastKpiResponse.data;
        setKpiId(kpiDocId);

        const response = await axios.get(
          `/api/getEfficiency?docId=${kpiDocId}`
        );
        setAvailableTime(response.data.efficiencyDoc.availableTime);
        setEffectiveTime(response.data.efficiencyDoc.effectiveTime);
        setEfficiency(response.data.efficiencyDoc.efficiency);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getAllEfficiency = async () => {
    try {
      const response = await axios.get("/api/getAllEfficiency");
      setKpiDoc(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const newProfile = () => {
    try {
      setLine("");
      setProduct("");
      setShift("");
      setDate("");
      setSubDekidaka([]);
      setProfileId("");
      setKpiId("");
      setTotalPlan(0);
      setTotalActual(0);
      setTotalDeviasi(0);
      setTotalLossTime(0);
      setIsDisabled(false);
      setIsInputFilled(false);
      setSwitchProfileUi(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const contextValue: GetDataContextValue = {
    line,
    product,
    shift,
    date,
    profileId,
    kpiId,
    isDisabled,
    isInputFilled,
    isModalUpdateOpen,
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
    subDekidaka,
    kpiDoc,
    tableIndex,
    itemId,
    isLoading,
    switchProfileUi,
    setSwitchProfileUi,
    setProfileId,
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
    setIsDisabled,
    setIsInputFilled,
    setIsModalUpdateOpen,
    getDekidaka,
    getLastKpi,
    getLastProfile,
    getDekidakaById,
    getDekidakaSum,
    getEfficiency,
    getAllEfficiency,
    newProfile,
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
    throw new Error("useGetDataContext must be used within a ProfileProvider");
  }
  return context;
};
