import axios from "axios";
import React, { createContext, useContext } from "react";
import { useGetDataContext } from "./getDataContext";
import { useAllStateContext } from "./allStateContext";
import { ProfileContextValue } from "./type/dataType";

const ProfileContext = createContext<ProfileContextValue | undefined>(
  undefined
);

export const ProfileProvider = ({ children }: any) => {
  const {
    getDekidaka,
    getDekidakaSum,
    getLastProfileDoc,
    getLastKpiDoc,
    getAllKpiData,
    getDailyKpi,
  } = useGetDataContext();

  const {
    userDataName,
    line,
    product,
    shift,
    date,
    setLine,
    setProduct,
    setShift,
    setDate,
    setTotalPlan,
    setTotalActual,
    setTotalDeviasi,
    setTotalLossTime,
    setIsInputFilled,
    setProfileId,
    profileId,
    setIsSwitchProfileUi,
    kpiId,
    setKpiId,
    setIsProfileLoading,
    setIsModalLoading,
    setIsBtnClicked,
    setIsModalDeleteProfileOpen,
    isModalDeleteProfileOpen,
    setIsEditMode,
    isMenuOpen,
    setIsMenuOpen,
    setIsCheckBtnDisabled,
    dekidakaData,
    setIsFormBlank,
    setDekidakaData,
    setDekidakaSumData,
    isEditMode,
  } = useAllStateContext();

  const handleShowWarning = () => {
    setIsInputFilled(false);
    setIsBtnClicked(true);
  };

  const handleModalDeleteProfile = () => {
    setIsModalDeleteProfileOpen(!isModalDeleteProfileOpen);
  };

  const toggleEditProfile = () => {
    setIsCheckBtnDisabled(false);
    setIsSwitchProfileUi(false);
    setIsEditMode(true);
  };

  const toggleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const addProfile = async () => {
    if (line && product && shift && date) {
      setIsCheckBtnDisabled(true);
      setIsProfileLoading(true);
    }

    const leaderGroups = {
      "Bowo Dwi": "1",
      "Ocza Aurellia": "2",
    };
    const group = leaderGroups[userDataName as keyof typeof leaderGroups];
    if (group) {
      try {
        if (line && product && shift && date) {
          const response = await axios.post(
            "/api/profileDataService/addProfileData",
            {
              line,
              group,
              leader: userDataName,
              product,
              shift,
              date,
            }
          );
          const { kpiDocId } = response.data;
          setKpiId(kpiDocId);
          setIsInputFilled(true);
          setIsProfileLoading(false);
          setIsSwitchProfileUi(true);
          getLastProfileDoc();
          getLastKpiDoc();
        } else {
          setIsBtnClicked(true);
        }
      } catch (error) {
        console.error("Error submitting form data:", error);
      }
    }
  };

  const updateProfile = async () => {
    setIsCheckBtnDisabled(true);
    setIsProfileLoading(true);
    try {
      await axios.patch("/api/profileDataService/updateProfileData", {
        docId: profileId,
        line,
        product,
        shift,
        date,
      });
      getLastProfileDoc();
      setIsProfileLoading(false);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteProfile = async () => {
    setIsModalLoading(true);
    try {
      await axios.delete(
        `/api/profileDataService/deleteProfileData?docId=${profileId}&kpiDocId=${kpiId}`
      );
      setIsModalLoading(false);
      setIsCheckBtnDisabled(false);
      setIsModalDeleteProfileOpen(false);
      setProfileId("");
      setIsSwitchProfileUi(false);
      getLastProfileDoc();
      getDekidaka();
      getDekidakaSum();
      getLastKpiDoc();
      getDailyKpi();
      getAllKpiData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const newProfile = () => {
    const task = () => {
      if (dekidakaData?.length === 0) {
        setIsFormBlank(true);
      } else {
        setIsSwitchProfileUi(false);
        setDekidakaData([]);
        setDekidakaSumData([]);
        setProfileId("");
        setKpiId("");
        setLine("");
        setProduct("");
        setShift("");
        setDate("");
        setIsCheckBtnDisabled(false);
        setIsInputFilled(false);
      }
    };
    try {
      if (isEditMode) {
        setIsEditMode(false);
        task();
      } else {
        task();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const contextValue: ProfileContextValue = {
    addProfile,
    updateProfile,
    deleteProfile,
    handleModalDeleteProfile,
    toggleEditProfile,
    toggleOpenMenu,
    handleShowWarning,
    newProfile,
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
