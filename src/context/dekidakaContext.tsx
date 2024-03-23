import { FormEvent } from "react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useProfileContext } from "../profile/profileContext";
import { useSession } from "next-auth/react";
import axios from "axios";
import Modal from "../pages/production/components/ui/modal";

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
  isModalUpdateOpen: boolean;
  setIsModalAddOpen: (value: boolean) => void;
  setIsModalUpdateOpen: (value: boolean) => void;
  modalAddData: () => React.ReactNode;
  modalUpdateData: () => React.ReactNode;
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

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [plan, setPlan] = useState<number | undefined>();
  const [actual, setActual] = useState<number | undefined>();
  const [deviasi, setDeviasi] = useState<number | undefined>();
  const [lossTime, setLossTime] = useState<number | undefined>();
  // const [userData, setUserData] = useState<any>(null);
  const [subDekidaka, setSubDekidaka] = useState<SubDekidaka[]>();
  const [subData, setSubData] = useState<SubData[]>();
  const [dateNow, setDateNow] = useState<any>("");
  const { data: session } = useSession<any>();

  const { userData, userDataName, userDataNik, setUserData } =
    useProfileContext();

  useEffect(() => {
    getDekidaka();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateNow]);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        if (session?.user) {
          setUserData(session.user);
          setDateNow(Date.now());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

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
        if (session?.user && userData) {
          if (username === userData.nama) {
            const response = await axios.get(`/api/getDekidaka?id=${id}`);
            setSubDekidaka(response.data);
            console.log(subDekidaka);
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

  type Data = {
    plan?: number;
    actual?: number;
    deviasi?: number;
    lossTime?: number;
  };

  const data: Data = {
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
  } else {
    calcLossTime = { lossTime: 0 };
  }

  const getDekidakaById = async (subDocId: string) => {
    try {
      setIsModalUpdateOpen(true);
      const storedLastDocId = localStorage.getItem("lastDocId") || "";
      if (storedLastDocId) {
        const [username, docId] = storedLastDocId.split("_");
        if (session?.user && userData) {
          if (username === userData.nama) {
            const response = await axios.get(
              `/api/getSubData?docId=${docId}&subDocId=${subDocId}`
            );
            setPlan(response.data.plan);
            setActual(response.data.actual);
            setDeviasi(response.data.deviasi);
            setLossTime(response.data.lossTime);
            setSubData(response.data);
            console.log(subData);
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
      const storedLastDocId = localStorage.getItem("lastDocId") || "";
      if (storedLastDocId) {
        const [username, id] = storedLastDocId.split("_");
        if (username === userDataName) {
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
          getDekidaka();
        }
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const updateDekidaka = async () => {};

  const modalAddData = () => {
    return (
      <Modal
        modalAction={<button onClick={handleAddModal}>Close</button>}
        modalBody={
          <form onSubmit={addDekidaka}>
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
                value={calcDeviasi?.deviasi ? calcDeviasi.deviasi : deviasi}
                onChange={(e) => setDeviasi(parseInt(e.target.value))}
                disabled
              />
              <label className="label">Loss Time</label>
              <input
                type="text"
                className="input input-bordered input-sm w-full"
                value={`${
                  calcLossTime?.lossTime ? calcLossTime.lossTime : lossTime
                }'`}
                onChange={(e) => setLossTime(parseInt(e.target.value))}
                disabled
              />
            </div>
            <button type="submit" className="btn btn-sm btn-ghost mt-2 w-full">
              Submit
            </button>
          </form>
        }
      />
    );
  };

  const modalUpdateData = () => {
    return (
      <dialog className="modal modal-bottom lg:modal-middle" open>
        <div className="modal-box">
          <div className="modal-action">
            <button onClick={handleUpdateModal}>Close</button>
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
                value={deviasi}
                onChange={(e) => setDeviasi(parseInt(e.target.value))}
                readOnly
              />
              <label className="label">Loss Time</label>
              <input
                type="text"
                className="input input-bordered input-sm w-full"
                value={`${lossTime}'`}
                onChange={(e) => setLossTime(parseInt(e.target.value))}
                readOnly
              />
            </div>
            <button type="submit" className="btn btn-sm btn-ghost mt-2 w-full">
              Submit
            </button>
          </form>
        </div>
      </dialog>
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
    setIsModalAddOpen,
    setIsModalUpdateOpen,
    getDekidakaById,
    modalAddData,
    modalUpdateData,
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
