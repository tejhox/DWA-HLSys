import { FormEvent } from "react";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Modal from "../pages/production/components/ui/modal";
import { useSessionContext } from "./sessionContext";

export type SubDekidaka = {
  id: string;
  plan: number;
  actual?: number;
  deviasi: number;
  lossTime: number;
};

type DekidakaContextValue = {
  subDekidaka: SubDekidaka[] | undefined;
  plan: number | undefined;
  actual: number | undefined;
  deviasi: number | undefined;
  lossTime: number | undefined;
  isModalAddOpen: boolean;
  isDeleteConfirmOpen: boolean;
  isModalUpdateOpen: boolean;
  setIsModalAddOpen: (value: boolean) => void;
  setIsModalUpdateOpen: (value: boolean) => void;
  modalAddData: () => React.ReactNode;
  modalUpdateData: () => React.ReactNode;
  modalDeleteConfirmation: () => React.ReactNode;
  getDekidakaById: (subDocId: string) => Promise<void>;
  handleAddModal: () => void;
  handleUpdateModal: () => void;
};

const DekidakaContext = createContext<DekidakaContextValue | undefined>(
  undefined
);

export const DekidakaProvider = ({ children }: any) => {
  type SubData = {
    plan: number;
    actual?: number;
    deviasi: number;
    lossTime: number;
  };
  type DekidakaData = {
    plan?: number;
    actual?: number;
    deviasi?: number;
    lossTime?: number;
  };

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [plan, setPlan] = useState<number | undefined>();
  const [actual, setActual] = useState<number | undefined>();
  const [deviasi, setDeviasi] = useState<number | undefined>();
  const [lossTime, setLossTime] = useState<number | undefined>(0);
  const [subDekidaka, setSubDekidaka] = useState<SubDekidaka[]>();
  const [subData, setSubData] = useState<SubData[]>();
  const [subDocId, setSubDocId] = useState<string>("");
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false);

  const { userData, userDataName, dateNow } = useSessionContext();

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

  let calcLossTime: { lossTime: number };

  if (subDekidaka && plan !== undefined && actual !== undefined) {
    const tableRowCount = subDekidaka.length;

    if (tableRowCount === 3 || tableRowCount === 7) {
      calcLossTime = { lossTime: Math.round((plan - actual) * (55 / plan)) };
    } else {
      calcLossTime = { lossTime: Math.round((plan - actual) * (60 / plan)) };
    }
  }

  useEffect(() => {
    getDekidaka();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateNow]);

  const handleAddModal = () => {
    setIsModalAddOpen(!isModalAddOpen);
  };
  const handleUpdateModal = () => {
    setIsModalUpdateOpen(!isModalUpdateOpen);
  };

  const getDekidaka = async () => {
    try {
      const storedLastDocId = localStorage.getItem("lastDocId") || "";
      if (storedLastDocId) {
        const [username, id] = storedLastDocId.split("_");
        if (userDataName && userData) {
          if (username === userDataName) {
            const response = await axios.get(`/api/getDekidaka?id=${id}`);
            setSubDekidaka(response.data);
          } else {
            console.log("Username tidak cocok");
          }
        }
      } else {
        console.log("Data tidak ditemukan");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDekidakaById = async (subDocId: string) => {
    try {
      setIsModalUpdateOpen(true);
      const storedLastDocId = localStorage.getItem("lastDocId") || "";
      if (storedLastDocId) {
        const [username, docId] = storedLastDocId.split("_");
        if (userDataName && userData) {
          if (username === userDataName) {
            const response = await axios.get(
              `/api/getDekidakaById?docId=${docId}&subDocId=${subDocId}`
            );
            setPlan(response.data.plan);
            setActual(response.data.actual);
            setDeviasi(response.data.deviasi);
            setLossTime(response.data.lossTime);
            setSubData(response.data);
            setSubDocId(response.data.id);
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

  const addDekidaka = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (plan && actual) {
        setIsBtnDisabled(true);
      }
      const storedLastDocId = localStorage.getItem("lastDocId") || "";
      if (storedLastDocId) {
        const [username, id] = storedLastDocId.split("_");
        if (username === userDataName) {
          if (plan && actual) {
            const response = await axios.post(`/api/addDekidaka`, {
              id,
              plan,
              actual,
              deviasi: calcDeviasi.deviasi,
              lossTime: calcLossTime.lossTime,
            });
            const { subDekidakaId } = response.data;
            localStorage.setItem(
              "subDekidaka",
              `${userDataName}_${subDekidakaId}`
            );
            setIsModalAddOpen(false);
            setIsBtnDisabled(false);
            getDekidaka();
          }
        }
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const updateDekidaka = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsBtnDisabled(true);
      const storedLastDocId = localStorage.getItem("lastDocId") || "";
      if (storedLastDocId) {
        const [username, docId] = storedLastDocId.split("_");
        if (userDataName && userData) {
          if (username === userDataName) {
            await axios.patch("/api/updateDekidaka", {
              docId: docId,
              subDocId: subDocId,
              plan: plan,
              actual: actual,
              deviasi: deviasi,
              lossTime: lossTime,
            });
            setIsModalUpdateOpen(false);
            setIsBtnDisabled(false);
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

  const deleteDekidaka = async () => {
    try {
      setIsModalUpdateOpen(true);
      const storedLastDocId = localStorage.getItem("lastDocId") || "";
      if (storedLastDocId) {
        const [username, docId] = storedLastDocId.split("_");
        if (userDataName && userData) {
          if (username === userDataName) {
            await axios.delete(
              `/api/deleteDekidaka?docId=${docId}&subDocId=${subDocId}`
            );
            setIsModalUpdateOpen(false);
            setIsDeleteConfirmOpen(false);
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
                  value={
                    calcLossTime.lossTime ? `${calcLossTime?.lossTime}` : "0"
                  }
                  onChange={(e) => setLossTime(parseInt(e.target.value))}
                  disabled
                />
              </div>
              <button
                type="submit"
                className="btn btn-sm btn-neutral mt-3 w-full"
                disabled={isBtnDisabled}>
                Submit
              </button>
            </form>
          </>
        }
      />
    );
  };

  const handleDeleteModal = () => {
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteConfirmOpen(false);
  };

  const modalUpdateData = () => {
    return (
      <Modal
        modalBody={
          <>
            <div className="flex justify-between">
              <button
                onClick={handleDeleteModal}
                className="btn btn-sm btn-ghost">
                DELETE
              </button>
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
                  value={`${calcLossTime?.lossTime}'`}
                  onChange={(e) => setLossTime(parseInt(e.target.value))}
                  disabled
                />
              </div>
              <button
                type="submit"
                className="btn btn-sm btn-neutral mt-3 w-full"
                disabled={isBtnDisabled}>
                Submit
              </button>
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
                onClick={closeDeleteModal}
                className="btn btn-sm btn-neutral ">
                Tidak
              </button>
              <button
                onClick={deleteDekidaka}
                className="btn btn-sm btn-neutral ms-3">
                Ya
              </button>
            </div>
          </div>
        }
      />
    );
  };

  const contextValue: DekidakaContextValue = {
    plan,
    actual,
    deviasi,
    lossTime,
    subDekidaka,
    isModalAddOpen,
    isModalUpdateOpen,
    isDeleteConfirmOpen,
    setIsModalAddOpen,
    setIsModalUpdateOpen,
    getDekidakaById,
    modalAddData,
    modalUpdateData,
    modalDeleteConfirmation,
    handleAddModal,
    handleUpdateModal,
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
