import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSessionContext } from "./sessionContext";

type ProductionContextValue = {
  docId: string;
  line: string;
  product: string;
  shift: string;
  date: string;
  isDisabled: boolean;
  isFilled: boolean;
  setDocId: (value: string) => void;
  setLine: (value: string) => void;
  setProduct: (value: string) => void;
  setShift: (value: string) => void;
  setDate: (value: string) => void;
  setIsDisabled: (value: boolean) => void;
  setIsFilled: (value: boolean) => void;
  addProfile: () => Promise<void>;
  showWarning: () => void;
};

const ProfileContext = createContext<ProductionContextValue | undefined>(
  undefined
);

export const ProfileProvider = ({ children }: any) => {
  const [line, setLine] = useState("");
  const [product, setProduct] = useState("");
  const [shift, setShift] = useState("");
  const [date, setDate] = useState("");
  const [docId, setDocId] = useState<string>("");
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { userData, userDataName, dateNow } = useSessionContext();

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateNow]);

  const getProfile = async () => {
    try {
      const storedLastDocId = localStorage.getItem("lastDocId") || "";
      if (storedLastDocId) {
        const [username, id] = storedLastDocId.split("_");
        if (userDataName && userData) {
          if (username === userDataName) {
            const response = await axios.get(`/api/getProfileData?id=${id}`);
            setLine(response.data.line);
            setProduct(response.data.product);
            setShift(response.data.shift);
            setDate(response.data.date);
            setIsFilled(true);
            setIsDisabled(true);
          } else {
            console.log("Username tidak cocok");
          }
        }
      } else {
        console.log("Data tidak ditemukan");
      }
    } catch {
      console.log("Error fetching data:");
    }
  };

  const addProfile = async () => {
    const leaderGroups: Record<string, string> = {
      "Bowo Dwi": "1",
      "Ocza Aurellia": "2",
    };
    const group = leaderGroups[userDataName as keyof typeof leaderGroups];

    if (group) {
      try {
        const response = await axios.post("/api/addProfileData", {
          line,
          group,
          leader: userDataName,
          product,
          shift,
          date,
        });
        const { docId } = response.data;
        localStorage.setItem("lastDocId", `${userDataName}_${docId}`);
        const lastDocId = localStorage.getItem("lastDocId") || "";
        setDocId(lastDocId || "");

        console.log("Profile data submitted successfully with ID :", docId);
        setIsDisabled(true);
        setIsFilled(true);

        if (docId) {
          const response = await axios.get(`/api/getDekidakaId?id=${docId}`);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error submitting form data:", error);
      }
    } else {
      console.log("Line bukan ER01");
    }
  };

  const showWarning = () => {
    setIsFilled(false);
  };

  const contextValue: ProductionContextValue = {
    line,
    setLine,
    product,
    setProduct,
    shift,
    setShift,
    date,
    setDate,
    isFilled,
    setIsFilled,
    docId,
    setDocId,
    isDisabled,
    setIsDisabled,
    addProfile,
    showWarning,
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};