import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSessionContext } from "./sessionContext";
import { useDekidakaContext } from "./dekidakaContext";
import Modal from "@/pages/production/components/ui/modal";

type ProductionContextValue = {
  profileId: string;
  line: string;
  product: string;
  shift: string;
  date: string;
  isDisabled: boolean;
  isFilled: boolean;
  isDeleteConfirmOpen: boolean;
  setProfileId: (value: string) => void;
  setLine: (value: string) => void;
  setProduct: (value: string) => void;
  setShift: (value: string) => void;
  setDate: (value: string) => void;
  setIsDisabled: (value: boolean) => void;
  setIsFilled: (value: boolean) => void;
  modalDeleteConfirmation: () => React.ReactNode;
  handleDeleteModal: () => void;
  addProfile: () => Promise<void>;
  updateProfile: () => Promise<void>;
  deleteProfile: () => Promise<void>;
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
  const [profileId, setProfileId] = useState<string>("");
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const { userData, userDataName, dateNow } = useSessionContext();
  const { getDekidaka } = useDekidakaContext();

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateNow]);

  const getProfile = async () => {
    try {
      const storedLastDocId = localStorage.getItem("profileDocId") || "";
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
      setLine("");
      setProduct("");
      setShift("");
      setDate("");
      setIsDisabled(false);
      setIsFilled(false);
      console.log("Error fetching data:");
    }
  };

  const addProfile = async () => {
    if (line && product && shift && date) {
      setIsDisabled(true);
    }

    const leaderGroups = {
      "Bowo Dwi": "1",
      "Ocza Aurellia": "2",
    };
    const group = leaderGroups[userDataName as keyof typeof leaderGroups];
    if (group) {
      try {
        if (line && product && shift && date) {
          const response = await axios.post("/api/addProfileData", {
            line,
            group,
            leader: userDataName,
            product,
            shift,
            date,
          });
          const { docId } = response.data;
          localStorage.setItem("profileDocId", `${userDataName}_${docId}`);
          const profileDocId = localStorage.getItem("profileDocId") || "";
          setProfileId(profileDocId || "");
          setIsFilled(true);
          getDekidaka();
        }
      } catch (error) {
        console.error("Error submitting form data:", error);
      }
    } else {
      console.log("Line bukan ER01");
    }
  };

  const updateProfile = async () => {
    setIsDisabled(true);
    try {
      const storedLastDocId = localStorage.getItem("profileDocId") || "";
      if (storedLastDocId) {
        const [username, id] = storedLastDocId.split("_");
        if (userDataName && userData) {
          if (username === userDataName) {
            await axios.patch("/api/updateProfileData", {
              id,
              line,
              product,
              shift,
              date,
            });
          } else {
            console.log("Username Not Found");
          }
        } else {
          console.log("Session Not Found");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteProfile = async () => {
    try {
      setIsDeleteConfirmOpen(true);
      const storedLastDocId = localStorage.getItem("profileDocId") || "";
      if (storedLastDocId) {
        const [username, docId] = storedLastDocId.split("_");
        if (userDataName && userData) {
          if (username === userDataName) {
            await axios.delete(`/api/deleteProfile?docId=${docId}`);
            setIsDeleteConfirmOpen(false);
            getProfile();
            getDekidaka();
          } else {
            console.log("Username Not Found");
          }
        } else {
          console.log("Session Not Found");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const showWarning = () => {
    setIsFilled(false);
  };

  const handleDeleteModal = () => {
    setIsDeleteConfirmOpen(!isDeleteConfirmOpen);
  };

  const modalDeleteConfirmation = () => {
    return (
      <Modal
        modalBody={
          <div className="p-2">
            <p>Hapus laporan ?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleDeleteModal}
                className="btn btn-sm btn-neutral ">
                Tidak
              </button>
              <button
                onClick={deleteProfile}
                className="btn btn-sm btn-error ms-2">
                Ya
              </button>
            </div>
          </div>
        }
      />
    );
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
    profileId,
    setProfileId,
    isDisabled,
    isDeleteConfirmOpen,
    setIsDisabled,
    updateProfile,
    handleDeleteModal,
    addProfile,
    deleteProfile,
    showWarning,
    modalDeleteConfirmation,
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
