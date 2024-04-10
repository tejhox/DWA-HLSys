import React, { createContext, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Modal from "@/components/modal";
import { useAppStateContext } from "./appStateContext";
import { useDekidakaContext } from "./dekidakaContext";
import { useProfileContext } from "./profileContext";
import { ModalFunctionContextValue } from "./type/dataType";

const ModalFunctionContext = createContext<
  ModalFunctionContextValue | undefined
>(undefined);

export const ModalFunctionProvider = ({ children }: any) => {
  const {
    plan,
    actual,
    setPlan,
    setActual,
    setDeviasi,
    setLossTime,
    isLoading,
    isBtnDisabled,
    setIsFormBlank,
  } = useAppStateContext();

  const {
    handleAddDekidakaModal,
    handleDeleteDekidakaModal,
    handleUpdateDekidakaModal,
    addDekidaka,
    updateDekidaka,
    deleteDekidaka,
    calculatedlossTimeValue,
    calculatedDeviasiValue,
    calculatedlossTimeValueById,
  } = useDekidakaContext();

  const { deleteProfile, handleModalDeleteProfile } = useProfileContext();

  const modalAddDekidaka = () => {
    return (
      <Modal
        modalBody={
          <>
            <div className="flex justify-end">
              <button onClick={handleAddDekidakaModal} className="me-1">
                ✕
              </button>
            </div>
            <form onSubmit={addDekidaka}>
              <div className="container w-full flex flex-col justify-start lg:px-7">
                <label htmlFor="planInput" className="label">
                  Plan
                </label>
                <input
                  id="planInput"
                  type="number"
                  className="input input-bordered input-sm w-full"
                  value={plan}
                  onChange={(e) => setPlan(parseInt(e.target.value))}
                />
                <label htmlFor="actualInput" className="label">
                  Aktual
                </label>
                <input
                  id="actualInput"
                  type="number"
                  className="input input-bordered input-sm w-full"
                  value={actual}
                  onChange={(e) => setActual(parseInt(e.target.value))}
                />
                <label className="label">Deviasi</label>
                <input
                  type="number"
                  className="input input-bordered input-sm w-full"
                  value={calculatedDeviasiValue}
                  onChange={(e) => setDeviasi(parseInt(e.target.value))}
                  disabled
                />
                <label className="label">Loss Time</label>
                <input
                  type="text"
                  className="input input-bordered input-sm w-full"
                  value={`${calculatedlossTimeValue}'`}
                  onChange={(e) => setLossTime(parseInt(e.target.value))}
                  disabled
                />
              </div>
              <div className="lg:px-7">
                <button
                  type="submit"
                  className="btn btn-sm bg-blue-700 text-white mt-3 w-full"
                  disabled={isBtnDisabled}>
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="loading loading-spinner mr-2"></span>
                      Loading...
                    </span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </>
        }
      />
    );
  };

  const modalUpdateDekidaka = () => {
    return (
      <Modal
        modalBody={
          <>
            <div className="flex justify-end">
              <button onClick={handleUpdateDekidakaModal} className="me-1">
                ✕
              </button>
            </div>
            <form onSubmit={updateDekidaka}>
              <div className="container w-full flex flex-col justify-start lg:px-7">
                <label htmlFor="planInput" className="label">
                  Plan
                </label>
                <input
                  id="planInput"
                  type="number"
                  className="input input-bordered input-sm w-full"
                  placeholder="55"
                  value={plan}
                  onChange={(e) => setPlan(parseInt(e.target.value))}
                />
                <label htmlFor="actualInput" className="label">
                  Aktual
                </label>
                <input
                  id="actualInput"
                  type="number"
                  className="input input-bordered input-sm w-full"
                  placeholder="55"
                  value={actual}
                  onChange={(e) => setActual(parseInt(e.target.value))}
                />
                <label className="label">Deviasi</label>
                <input
                  type="number"
                  className="input input-bordered input-sm w-full"
                  value={calculatedDeviasiValue}
                  onChange={(e) => setDeviasi(parseInt(e.target.value))}
                  disabled
                />
                <label className="label">Loss Time</label>
                <input
                  type="text"
                  className="input input-bordered input-sm w-full"
                  value={`${calculatedlossTimeValueById}'`}
                  onChange={(e) => setLossTime(parseInt(e.target.value))}
                  disabled
                />
              </div>
              <div className="flex justify-between mt-3 lg:px-7">
                <button
                  type="button"
                  onClick={handleDeleteDekidakaModal}
                  className="btn btn-sm btn-outline btn-error">
                  <FontAwesomeIcon icon={faTrashCan} size="lg" />
                </button>
                <button
                  type="submit"
                  className="btn btn-sm bg-blue-700 text-white w-1/2 md:w-80"
                  disabled={isBtnDisabled}>
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="loading loading-spinner mr-2"></span>
                      Loading...
                    </span>
                  ) : (
                    "Edit"
                  )}
                </button>
              </div>
            </form>
          </>
        }
      />
    );
  };

  const modalDeleteDekidakaConfirmation = () => {
    return (
      <Modal
        modalBody={
          <div className="p-2">
            <p>Anda yakin ingin menghapus data?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleDeleteDekidakaModal}
                className="btn btn-sm bg-blue-700 text-white">
                Tidak
              </button>
              <button
                onClick={deleteDekidaka}
                className="btn btn-sm btn-error ms-2">
                {" "}
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="loading loading-spinner mr-2"></span>
                  </span>
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

  const modalDeleteProfileConfirmation = () => {
    return (
      <Modal
        modalBody={
          <div className="p-2">
            <p>Hapus laporan ?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleModalDeleteProfile}
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

  const modalBlankFormWarning = () => {
    return (
      <Modal
        modalBody={
          <div>
            <div>
              <p className="text-error font-bold underline">
                Laporan masih kosong!
              </p>
              <p className="mt-2 text-sm">
                *Silahkan isi atau hapus laporan terlebih dahulu
              </p>
            </div>
            <div className="flex justify-end mt-3">
              <button
                onClick={() => setIsFormBlank(false)}
                className="btn btn-sm btn-primary">
                OK
              </button>
            </div>
          </div>
        }
      />
    );
  };

  const contextValue: ModalFunctionContextValue = {
    modalAddDekidaka,
    modalUpdateDekidaka,
    modalDeleteProfileConfirmation,
    modalDeleteDekidakaConfirmation,
    modalBlankFormWarning,
  };

  return (
    <ModalFunctionContext.Provider value={contextValue}>
      {children}
    </ModalFunctionContext.Provider>
  );
};

export const useModalFunctionContext = () => {
  const context = useContext(ModalFunctionContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
