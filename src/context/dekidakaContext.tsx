import { FormEvent } from "react";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Modal from "../pages/production/components/ui/modal";
import { useSessionContext } from "./sessionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

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
  totalPlan: number | undefined;
  totalActual: number | undefined;
  totalDeviasi: number | undefined;
  totalLossTime: number | undefined;
  isModalAddOpen: boolean;
  isDeleteConfirmOpen: boolean;
  isModalUpdateOpen: boolean;
  isLoading: boolean;
  setIsModalAddOpen: (value: boolean) => void;
  setIsModalUpdateOpen: (value: boolean) => void;
  setIsDeleteConfirmOpen: (value: boolean) => void;
  modalAddData: () => React.ReactNode;
  modalUpdateData: () => React.ReactNode;
  modalDeleteConfirmation: () => React.ReactNode;
  getDekidaka: () => Promise<void>;
  getDekidakaById: (subDocId: string, index: number) => Promise<void>;
  handleAddModal: () => void;
  handleUpdateModal: () => void;
  handleDeleteModal: () => void;
};

const DekidakaContext = createContext<DekidakaContextValue | undefined>(
  undefined
);

export const DekidakaProvider = ({ children }: any) => {
  type SubData = {
    plan?: number;
    actual?: number;
    deviasi?: number;
    lossTime?: number;
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
  const [tableIndex, setTableIndex] = useState<number>(0);
  const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalId, setTotalId] = useState<string>("");

  const [totalPlan, setTotalPlan] = useState<number>();
  const [totalActual, setTotalActual] = useState<number>();
  const [totalDeviasi, setTotalDeviasi] = useState<number>();
  const [totalLossTime, setTotalLossTime] = useState<number>();

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

  useEffect(() => {
    getDekidaka();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateNow]);

  useEffect(() => {
    getDekidakaSum();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateNow]);

  const handleAddModal = () => {
    setIsModalAddOpen(!isModalAddOpen);
  };
  const handleUpdateModal = () => {
    setIsModalUpdateOpen(!isModalUpdateOpen);
  };
  const handleDeleteModal = () => {
    setIsDeleteConfirmOpen(!isDeleteConfirmOpen);
  };

  const sumDekidaka = async () => {
    try {
      const storedLastDocId = localStorage.getItem("profileDocId") || "";
      if (storedLastDocId) {
        const [username, id] = storedLastDocId.split("_");
        if (userDataName && userData) {
          if (username === userDataName) {
            await axios.post(`/api/sumDekidaka`, {
              id,
            });
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

  const getDekidakaSum = async () => {
    try {
      const storedLastDocId = localStorage.getItem("profileDocId") || "";
      if (storedLastDocId) {
        const [username, id] = storedLastDocId.split("_");
        if (userDataName && userData) {
          if (username === userDataName) {
            const response = await axios.get(`/api/getDekidakaSum?id=${id}`);
            setTotalPlan(response.data.totalPlan);
            setTotalActual(response.data.totalActual);
            setTotalDeviasi(response.data.totalDeviasi);
            setTotalLossTime(response.data.totalLossTime);
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

  const getDekidaka = async () => {
    try {
      setIsLoading(true);
      const storedLastDocId = localStorage.getItem("profileDocId") || "";
      if (storedLastDocId) {
        const [username, id] = storedLastDocId.split("_");
        if (userDataName && userData) {
          if (username === userDataName) {
            const response = await axios.get(`/api/getDekidaka?id=${id}`);
            setSubDekidaka(response.data);
            getDekidakaSum();
            setIsLoading(false);
          } else {
            console.log("Username tidak cocok");
          }
        }
      } else {
        console.log("Data tidak ditemukan");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const getDekidakaById = async (subDocId: string, index: number) => {
    try {
      setIsModalUpdateOpen(true);
      const storedLastDocId = localStorage.getItem("profileDocId") || "";
      if (storedLastDocId) {
        const [username, docId] = storedLastDocId.split("_");
        if (userDataName && userData) {
          if (username === userDataName) {
            const response = await axios.get(
              `/api/getDekidakaById?docId=${docId}&subDocId=${subDocId}`
            );
            setTableIndex(index);
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
      const storedLastDocId = localStorage.getItem("profileDocId") || "";
      if (storedLastDocId) {
        const [username, id] = storedLastDocId.split("_");
        if (username === userDataName) {
          if (plan && actual) {
            await axios.post(`/api/addDekidaka`, {
              id,
              plan,
              actual,
              deviasi: calcDeviasi.deviasi,
              lossTime: calcLossTime.lossTime,
            });
            sumDekidaka();
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
      const storedLastDocId = localStorage.getItem("profileDocId") || "";
      if (storedLastDocId) {
        const [username, docId] = storedLastDocId.split("_");
        if (userDataName && userData) {
          if (username === userDataName) {
            await axios.patch("/api/updateDekidaka", {
              docId: docId,
              subDocId: subDocId,
              plan: plan,
              actual: actual,
              deviasi: calcDeviasi.deviasi,
              lossTime: calcEditLossTime.lossTime,
            });
            sumDekidaka();
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
      const storedLastDocId = localStorage.getItem("profileDocId") || "";
      if (storedLastDocId) {
        const [username, docId] = storedLastDocId.split("_");
        if (userDataName && userData) {
          if (username === userDataName) {
            await axios.delete(
              `/api/deleteDekidaka?docId=${docId}&subDocId=${subDocId}`
            );
            sumDekidaka();
            setIsDeleteConfirmOpen(false);
            setIsModalUpdateOpen(false);
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
                  value={`${calcLossTime?.lossTime}'`}
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
    plan,
    actual,
    deviasi,
    lossTime,
    totalPlan,
    totalActual,
    totalDeviasi,
    totalLossTime,
    subDekidaka,
    isModalAddOpen,
    isModalUpdateOpen,
    isDeleteConfirmOpen,
    setIsModalAddOpen,
    setIsModalUpdateOpen,
    setIsDeleteConfirmOpen,
    isLoading,
    getDekidakaById,
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
