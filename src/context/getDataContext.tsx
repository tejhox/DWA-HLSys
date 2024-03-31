import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSessionContext } from "./sessionContext";

export type SubDekidaka = {
  id: string;
  plan: number;
  actual: number;
  deviasi: number;
  lossTime: number;
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
  profileId: string;
  itemId: string;
  subDekidaka: SubDekidaka[] | undefined;
  tableIndex: number;
  isDisabled: boolean;
  isInputFilled: boolean;
  isModalUpdateOpen: boolean;
  isLoading: boolean;
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
  setProfileId: (value: string) => void;
  setIsModalUpdateOpen: (value: boolean) => void;
  getDekidaka: () => Promise<void>;
  getLastProfile: () => Promise<void>;
  getDekidakaById: (subDocId: string, index: number) => Promise<void>;
  getDekidakaSum: () => Promise<void>;
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
  const [profileId, setProfileId] = useState("");

  const [isInputFilled, setIsInputFilled] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const [subDekidaka, setSubDekidaka] = useState<SubDekidaka[]>();
  const [itemId, setItemId] = useState<string>("");
  const [tableIndex, setTableIndex] = useState<number>(0);

  const { userDataName, dateNow } = useSessionContext();

  useEffect(() => {
    getLastProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateNow]);

  useEffect(() => {
    if (profileId) {
      getDekidaka();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId, dateNow]);

  useEffect(() => {
    if (profileId) {
      getDekidakaSum();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId]);

  const getLastProfile = async () => {
    const name = userDataName;
    try {
      const response = await axios.get(`/api/getLastProfile?name=${name}`);
      if (response.data) {
        setLine(response.data.line);
        setProduct(response.data.product);
        setShift(response.data.shift);
        setDate(response.data.date);
        const { docId } = response.data;
        setProfileId(docId);
        setIsInputFilled(true);
        setIsDisabled(true);
      }
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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDekidaka = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/api/getDekidaka?docId=${profileId}`);
      setSubDekidaka(response.data);
      getDekidakaSum();
      setIsLoading(false);
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

  const contextValue: GetDataContextValue = {
    line,
    product,
    shift,
    date,
    profileId,
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
    subDekidaka,
    tableIndex,
    itemId,
    isLoading,
    setProfileId,
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
    getLastProfile,
    getDekidakaById,
    getDekidakaSum,
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
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
