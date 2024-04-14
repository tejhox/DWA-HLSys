import React, { createContext, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Modal from "@/components/modal";
import { useAllStateContext } from "./allStateContext";
import { useDekidakaContext } from "./dekidakaContext";
import { useProfileContext } from "./profileContext";
import { ModalFunctionContextValue } from "./type/dataType";
import { faNoteSticky } from "@fortawesome/free-regular-svg-icons";

const ModalFunctionContext = createContext<
  ModalFunctionContextValue | undefined
>(undefined);

export const ModalFunctionProvider = ({ children }: any) => {
  const {
    plan,
    actual,
    man,
    method,
    machine,
    material,
    lossTimeNotes,
    setPlan,
    setActual,
    setDeviasi,
    setLossTime,
    setMan,
    setMethod,
    setMachine,
    setMaterial,
    setLossTimeNotes,
    isModalLoading,
    isBtnDisabled,
    setIsFormBlank,
    isShowAlert,
  } = useAllStateContext();

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
    handleLossTimeDetailsModal,
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
                <div className="flex items-center justify-between">
                  <label className="label">Loss Time</label>
                  <button
                    type="button"
                    onClick={handleLossTimeDetailsModal}
                    className="btn btn-sm btn-ghost text-primary underline">
                    <FontAwesomeIcon icon={faNoteSticky} />
                    Notes
                  </button>
                </div>
                <input
                  type="text"
                  className="input input-bordered input-sm w-full"
                  value={`${calculatedlossTimeValue}'`}
                  onChange={(e) => setLossTime(parseInt(e.target.value))}
                  disabled
                />
              </div>
              {isShowAlert ? (
                <p className="text-center text-error text-sm mt-2">
                  Isi keterangan loss time!
                </p>
              ) : (
                ""
              )}
              <div className="lg:px-7">
                <button
                  type="submit"
                  className="btn btn-sm bg-blue-700 text-white mt-3 w-full"
                  disabled={isBtnDisabled}>
                  {isModalLoading ? (
                    <span className="flex items-center">
                      <span className="loading loading-spinner mr-2"></span>
                      Loading...
                    </span>
                  ) : (
                    "Simpan"
                  )}
                </button>
              </div>
            </form>
          </>
        }
      />
    );
  };

  const modalLossTimeDetails = () => {
    return (
      <Modal
        modalBody={
          <>
            <div className="flex justify-end">
              <button onClick={handleLossTimeDetailsModal} className="me-1">
                ✕
              </button>
            </div>
            <form>
              <div className="container w-full flex justify-between lg:px-7">
                <div className="container flex flex-col w-1/2 pe-3">
                  <label htmlFor="manInput" className="label text-sm">
                    Man
                  </label>
                  <input
                    id="manInput"
                    type="number"
                    className="input input-bordered input-sm w-full"
                    value={man}
                    onChange={(e) => setMan(parseInt(e.target.value))}
                  />
                  <label htmlFor="methodInput" className="label text-sm">
                    Method
                  </label>
                  <input
                    id="methodInput"
                    type="number"
                    className="input input-bordered input-sm w-full"
                    value={method}
                    onChange={(e) => setMethod(parseInt(e.target.value))}
                  />
                </div>
                <div className="container flex flex-col w-1/2 ps-3">
                  <label htmlFor="machineInput" className="label text-sm">
                    Machine
                  </label>
                  <input
                    id="machineInput"
                    type="number"
                    className="input input-bordered input-sm w-full"
                    value={machine}
                    onChange={(e) => setMachine(parseInt(e.target.value))}
                  />
                  <label htmlFor="materialInput" className="label text-sm">
                    Material
                  </label>
                  <input
                    id="materialInput"
                    type="number"
                    className="input input-bordered input-sm w-full"
                    value={material}
                    onChange={(e) => setMaterial(parseInt(e.target.value))}
                  />
                </div>
              </div>
              <label htmlFor="keteranganInput" className="label text-sm">
                Keterangan
              </label>
              <textarea
                id="keteranganInput"
                className="textarea textarea-bordered h-24 w-full"
                value={lossTimeNotes}
                onChange={(e) => setLossTimeNotes(e.target.value)}></textarea>
              <div className="lg:px-7">
                <button
                  type="button"
                  onClick={handleLossTimeDetailsModal}
                  className="btn btn-sm bg-blue-700 text-white mt-3 w-full">
                  OK
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
                <div className="flex items-center justify-between">
                  <label className="label">Loss Time</label>
                  <button
                    type="button"
                    onClick={handleLossTimeDetailsModal}
                    className="btn btn-sm btn-ghost text-primary underline">
                    <FontAwesomeIcon icon={faNoteSticky} />
                    Notes
                  </button>
                </div>
                <input
                  type="text"
                  className="input input-bordered input-sm w-full"
                  value={`${calculatedlossTimeValueById}'`}
                  onChange={(e) => setLossTime(parseInt(e.target.value))}
                  disabled
                />
              </div>
              <div className="flex justify-end mt-3 lg:px-7">
                <button
                  type="button"
                  onClick={handleDeleteDekidakaModal}
                  className="btn btn-sm btn-outline btn-error me-2"
                  disabled={isModalLoading}>
                  {isModalLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <FontAwesomeIcon icon={faTrashCan} size="lg" />
                  )}
                </button>
                <button
                  type="submit"
                  className="btn btn-sm bg-blue-700 text-white w-1/3 md:w-80"
                  disabled={isModalLoading}>
                  {isModalLoading ? (
                    <span className="flex items-center">
                      <span className="loading loading-spinner"></span>
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
                className="btn btn-sm btn-error ms-2"
                disabled={isModalLoading}>
                {isModalLoading ? (
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
                {isModalLoading ? (
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
    modalLossTimeDetails,
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
    throw new Error("Error accessing context");
  }
  return context;
};
