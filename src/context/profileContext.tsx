import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import Modal from "@/components/modal";
import { useSessionContext } from "./sessionContext";
import { useDekidakaContext } from "./dekidakaContext";
import { useGetDataContext } from "./getDataContext";
import { getEfficiency } from "@/lib/services/firebase/dataServices/KpiService";

type ProductionContextValue = {
  line: string;
  product: string;
  shift: string;
  date: string;
  isDeleteConfirmOpen: boolean;
  isButtonClicked: boolean;
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
  const [isButtonClicked, setIsButtonClicked] = useState(false);
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
    setSwitchProfileUi,
    kpiId,
    setKpiId,
    isLoading,
    setIsLoading,
    getLastProfile,
    getLastKpi,
    getEfficiency,
    getAllEfficiency,
  } = useGetDataContext();

  const addProfile = async () => {
    if (line && product && shift && date) {
      setIsDisabled(true);
      setIsLoading(true);
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
          const { kpiDocId } = response.data;
          setKpiId(kpiDocId);
          setIsInputFilled(true);
          setIsLoading(false);
          setSwitchProfileUi(true);
          getDekidaka();
          getLastProfile();
          getLastKpi();
        } else {
          setIsButtonClicked(true);
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
      await getLastProfile();
      setSwitchProfileUi(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteProfile = async () => {
    setIsLoading(true);
    try {
      await axios.delete(
        `/api/deleteProfileData?docId=${profileId}&kpiDocId=${kpiId}`
      );
      setTotalPlan(0);
      setTotalActual(0);
      setTotalDeviasi(0);
      setTotalLossTime(0);
      setIsLoading(false);
      setIsDeleteConfirmOpen(false);
      setProfileId("");
      setSwitchProfileUi(false);
      getLastProfile();
      getLastKpi();
      getDekidaka();
      getEfficiency();
      getAllEfficiency();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleShowWarning = () => {
    setIsInputFilled(false);
    setIsButtonClicked(true);
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
                className="btn btn-sm bg-blue-700 text-white ">
                Tidak
              </button>
              <button
                onClick={deleteProfile}
                className="btn btn-sm btn-error ms-2">
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Ya"
                )}
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
    isButtonClicked,
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
