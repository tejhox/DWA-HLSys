import axios from "axios";
import React, { createContext, useContext } from "react";
import { useGetDataContext } from "./getDataContext";
import { useAppStateContext } from "./appStateContext";
import { ProfileContextValue } from "./type/dataType";

const ProfileContext = createContext<ProfileContextValue | undefined>(
  undefined
);

export const ProfileProvider = ({ children }: any) => {
  const {
    getDekidaka,
    getLastProfile,
    getLastKpi,
    getEfficiency,
    getLossTimeKpi,
    getAllEfficiency,
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
    setIsLoading,
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
  } = useAppStateContext();

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
          setIsLoading(false);
          setIsSwitchProfileUi(true);
          getDekidaka();
          getLastProfile();
          getLastKpi();
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
    try {
      await axios.patch("/api/profileDataService/updateProfileData", {
        docId: profileId,
        line,
        product,
        shift,
        date,
      });
      await getLastProfile();
      setIsSwitchProfileUi(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteProfile = async () => {
    setIsLoading(true);
    try {
      await axios.delete(
        `/api/profileDataService/deleteProfileData?docId=${profileId}&kpiDocId=${kpiId}`
      );
      setLine("");
      setProduct("");
      setShift("");
      setDate("");
      setTotalPlan(0);
      setTotalActual(0);
      setTotalDeviasi(0);
      setTotalLossTime(0);
      setIsLoading(false);
      setIsCheckBtnDisabled(false);
      setIsModalDeleteProfileOpen(false);
      setProfileId("");
      setIsSwitchProfileUi(false);
      getLastProfile();
      getLastKpi();
      getDekidaka();
      getEfficiency();
      getLossTimeKpi();
      getAllEfficiency();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const newProfile = () => {
    try {
      if (dekidakaData?.length === 0) {
        setIsFormBlank(true);
      } else {
        setIsSwitchProfileUi(false);
        setDekidakaData([]);
        setLine("");
        setProduct("");
        setShift("");
        setDate("");
        setProfileId("");
        setKpiId("");
        setTotalPlan(0);
        setTotalActual(0);
        setTotalDeviasi(0);
        setTotalLossTime(0);
        setIsCheckBtnDisabled(false);
        setIsInputFilled(false);
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
