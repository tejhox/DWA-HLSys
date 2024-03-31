import axios from "axios";
import Modal from "../pages/production/components/ui/modal";
import React, { createContext, useContext, useState } from "react";
import { FormEvent } from "react";
import { useGetDataContext } from "./getDataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

type DekidakaContextValue = {
  isModalAddOpen: boolean;
  isDeleteConfirmOpen: boolean;
  isModalUpdateOpen: boolean;
  setIsModalAddOpen: (value: boolean) => void;
  setIsModalUpdateOpen: (value: boolean) => void;
  setIsDeleteConfirmOpen: (value: boolean) => void;
  modalAddData: () => React.ReactNode;
  modalUpdateData: () => React.ReactNode;
  modalDeleteConfirmation: () => React.ReactNode;
  getDekidaka: () => Promise<void>;
  handleAddModal: () => void;
  handleUpdateModal: () => void;
  handleDeleteModal: () => void;
};

const DekidakaContext = createContext<DekidakaContextValue | undefined>(
  undefined
);

export const DekidakaProvider = ({ children }: any) => {
  type DekidakaData = {
    plan: number | undefined;
    actual: number | undefined;
    deviasi: number | undefined;
    lossTime: number | undefined;
  };

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const {
    plan,
    actual,
    deviasi,
    lossTime,
    setPlan,
    setActual,
    setDeviasi,
    setLossTime,
    itemId,
    subDekidaka,
    tableIndex,
    getDekidaka,
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    profileId,
    getDekidakaSum,
  } = useGetDataContext();

  const handleAddModal = () => {
    setIsModalAddOpen(!isModalAddOpen);
  };
  const handleUpdateModal = () => {
    setIsModalUpdateOpen(!isModalUpdateOpen);
  };
  const handleDeleteModal = () => {
    setIsDeleteConfirmOpen(!isDeleteConfirmOpen);
  };

  const data: DekidakaData = {
    plan: plan,
    actual: actual,
    deviasi: deviasi,
    lossTime: lossTime,
  };

  const calcDeviasi = {
    deviasi:
      data.actual !== undefined && data.plan !== undefined
        ? data.actual - data.plan
        : undefined,
  };

  let calcLossTime: { lossTime: number } = { lossTime: 0 };

  if (subDekidaka && plan !== undefined && actual !== undefined) {
    const tableRowCount = subDekidaka.length;
    let lossTimeRatio;
    if (tableRowCount === 3 || tableRowCount === 7) {
      lossTimeRatio = 55 / plan;
    } else {
      lossTimeRatio = 60 / plan;
    }
    if (calcLossTime === undefined) {
      calcLossTime = { lossTime: 0 };
    }
    calcLossTime.lossTime = Math.round((plan - actual) * lossTimeRatio);
  }

  let calcEditLossTime: { lossTime: number };

  if (subDekidaka && plan !== undefined && actual !== undefined) {
    if (tableIndex === 3 || tableIndex === 7) {
      calcEditLossTime = {
        lossTime: Math.round((plan - actual) * (55 / plan)),
      };
    } else {
      calcEditLossTime = {
        lossTime: Math.round((plan - actual) * (60 / plan)),
      };
    }
  }

  const sumDekidaka = async () => {
    try {
      await axios.post(`/api/sumDekidaka`, {
        docId: profileId,
      });
      getDekidaka();
      getDekidakaSum();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addDekidaka = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (plan && actual) {
        setIsBtnDisabled(true);
        await axios.post(`/api/addDekidaka`, {
          docId: profileId,
          plan,
          actual,
          deviasi: calcDeviasi.deviasi,
          lossTime: calcLossTime.lossTime,
        });
        sumDekidaka();
        setIsModalAddOpen(false);
        setIsBtnDisabled(false);
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const updateDekidaka = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsBtnDisabled(true);
      await axios.patch("/api/updateDekidaka", {
        docId: profileId,
        subDocId: itemId,
        plan: plan,
        actual: actual,
        deviasi: calcDeviasi.deviasi,
        lossTime: calcEditLossTime.lossTime,
      });
      sumDekidaka();
      setIsModalUpdateOpen(false);
      setIsBtnDisabled(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteDekidaka = async () => {
    try {
      await axios.delete(
        `/api/deleteDekidaka?docId=${profileId}&subDocId=${itemId}`
      );
      sumDekidaka();
      setIsDeleteConfirmOpen(false);
      setIsModalUpdateOpen(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const modalAddData = () => {
    return (
      <Modal
        modalBody={
          <>
            <div className="flex justify-end">
              <button onClick={handleAddModal} className="me-1">
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
                  value={calcDeviasi?.deviasi}
                  onChange={(e) => setDeviasi(parseInt(e.target.value))}
                  disabled
                />
                <label className="label">Loss Time</label>
                <input
                  type="text"
                  className="input input-bordered input-sm w-full"
                  value={`${calcLossTime?.lossTime}'` ?? ""}
                  onChange={(e) => setLossTime(parseInt(e.target.value))}
                  disabled
                />
              </div>
              <div className="lg:px-7">
                <button
                  type="submit"
                  className="btn btn-sm btn-neutral mt-3 w-full"
                  disabled={isBtnDisabled}>
                  Submit
                </button>
              </div>
            </form>
          </>
        }
      />
    );
  };

  const modalUpdateData = () => {
    return (
      <Modal
        modalBody={
          <>
            <div className="flex justify-end">
              <button onClick={handleUpdateModal} className="me-1">
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
                  value={calcDeviasi?.deviasi}
                  onChange={(e) => setDeviasi(parseInt(e.target.value))}
                  disabled
                />
                <label className="label">Loss Time</label>
                <input
                  type="text"
                  className="input input-bordered input-sm w-full"
                  value={`${calcEditLossTime?.lossTime}'`}
                  onChange={(e) => setLossTime(parseInt(e.target.value))}
                  disabled
                />
              </div>
              <div className="flex justify-between mt-3 lg:px-7">
                <button
                  type="button"
                  onClick={handleDeleteModal}
                  className="btn btn-sm btn-outline btn-error">
                  <FontAwesomeIcon icon={faTrashCan} size="lg" />
                </button>
                <button
                  type="submit"
                  className="btn btn-sm btn-neutral w-2/3 md:w-80"
                  disabled={isBtnDisabled}>
                  Edit
                </button>
              </div>
            </form>
          </>
        }
      />
    );
  };

  const modalDeleteConfirmation = () => {
    return (
      <Modal
        modalBody={
          <div className="p-2">
            <p>Anda yakin ingin menghapus data?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleDeleteModal}
                className="btn btn-sm btn-neutral ">
                Tidak
              </button>
              <button
                onClick={deleteDekidaka}
                className="btn btn-sm btn-neutral ms-2">
                Ya
              </button>
            </div>
          </div>
        }
      />
    );
  };

  const contextValue: DekidakaContextValue = {
    isModalAddOpen,
    isModalUpdateOpen,
    isDeleteConfirmOpen,
    setIsModalAddOpen,
    setIsModalUpdateOpen,
    setIsDeleteConfirmOpen,
    getDekidaka,
    modalAddData,
    modalUpdateData,
    modalDeleteConfirmation,
    handleAddModal,
    handleUpdateModal,
    handleDeleteModal,
  };

  return (
    <DekidakaContext.Provider value={contextValue}>
      {children}
    </DekidakaContext.Provider>
  );
};

export const useDekidakaContext = () => {
  const context = useContext(DekidakaContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
