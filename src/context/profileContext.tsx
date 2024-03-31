import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSessionContext } from "./sessionContext";
import { useDekidakaContext } from "./dekidakaContext";
import Modal from "@/pages/production/components/ui/modal";
import { useGetDataContext } from "./getDataContext";

type ProductionContextValue = {
  line: string;
  product: string;
  shift: string;
  date: string;
  isDeleteConfirmOpen: boolean;
  addProfile: () => Promise<void>;
  updateProfile: () => Promise<void>;
  modalDeleteConfirmation: () => React.ReactNode;
  handleDeleteModal: () => void;
  handleShowWarning: () => void;
};

const ProfileContext = createContext<ProductionContextValue | undefined>(
  undefined
);

export const ProfileProvider = ({ children }: any) => {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { userDataName } = useSessionContext();
  const { getDekidaka } = useDekidakaContext();

  const {
    line,
    product,
    shift,
    date,
    setTotalPlan,
    setTotalActual,
    setTotalDeviasi,
    setTotalLossTime,
    setIsDisabled,
    setIsInputFilled,
    setProfileId,
    profileId,
    getDekidakaSum,
  } = useGetDataContext();

  const { getLastProfile } = useGetDataContext();

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
          setProfileId(docId);
          setIsInputFilled(true);
          getDekidaka();
        }
      } catch (error) {
        console.error("Error submitting form data:", error);
      }
    }
  };

  const updateProfile = async () => {
    setIsDisabled(true);
    try {
      await axios.patch("/api/updateProfileData", {
        docId: profileId,
        line,
        product,
        shift,
        date,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteProfile = async () => {
    try {
      await axios.delete(`/api/deleteProfileData?docId=${profileId}`);
      setTotalPlan(0);
      setTotalActual(0);
      setTotalDeviasi(0);
      setTotalLossTime(0);
      setIsDeleteConfirmOpen(false);
      setProfileId("");
      getLastProfile();
      getDekidaka();
      getDekidakaSum();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleShowWarning = () => {
    setIsInputFilled(false);
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
    product,
    shift,
    date,
    isDeleteConfirmOpen,
    addProfile,
    updateProfile,
    handleDeleteModal,
    handleShowWarning,
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
