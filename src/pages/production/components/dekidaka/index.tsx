/* eslint-disable react/no-unescaped-entities */
import { useState, FormEvent, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const Dekidaka = () => {
  type SubDekidaka = {
    plan: number;
    actual?: number;
    deviasi: number;
    lossTime: number;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plan, setPlan] = useState<number | undefined>();
  const [actual, setActual] = useState<number | undefined>();
  const [deviasi, setDeviasi] = useState<number | undefined>();
  const [lossTime, setLossTime] = useState<number | undefined>();
  const [userData, setUserData] = useState<any>(null);
  const [subDekidaka, setSubDekidaka] = useState<SubDekidaka[]>();
  const [dateNow, setDateNow] = useState<any>("");
  const { data: session } = useSession<any>();

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
  }, [session]);

  useEffect(() => {
    getDekidaka();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateNow]);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
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
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const storedLastDocId = localStorage.getItem("lastDocId") || "";
      if (storedLastDocId) {
        const [username, id] = storedLastDocId.split("_");
        if (username === userData.nama) {
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
            `${userData.nama}_${subDekidakaId}`
          );
          setIsModalOpen(false);
          getDekidaka();
        }
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const renderModal = () => {
    return (
      <dialog className="modal modal-bottom lg:modal-middle" open>
        <div className="modal-box">
          <div className="modal-action">
            <button onClick={openModal}>Close</button>
          </div>
          <form onSubmit={handleSubmit}>
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
                value={calcDeviasi.deviasi}
                onChange={(e) => setDeviasi(parseInt(e.target.value))}
                disabled
              />
              <label className="label">Loss Time</label>
              <input
                type="text"
                className="input input-bordered input-sm w-full"
                value={`${calcLossTime.lossTime}'`}
                onChange={(e) => setLossTime(parseInt(e.target.value))}
                disabled
              />
              <button type="submit" className="btn btn-primary mt-2">
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    );
  };

  return (
    <div className="flex justify-center px-3 mt-1 h-full w-full lg:w-1/3">
      <div className="container w-full border rounded-lg p-2">
        <table className="table table-sm text-center">
          <thead>
            <tr>
              <th>Jam</th>
              <th>Plan</th>
              <th>Aktual</th>
              <th>Deviasi</th>
              <th>Loss Time</th>
            </tr>
          </thead>
          <tbody>
            {subDekidaka?.map((item: SubDekidaka, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.plan}</td>
                <td>{item.actual}</td>
                <td>{item.deviasi}</td>
                <td>{item.lossTime}'</td>
              </tr>
            ))}
          </tbody>
          {isModalOpen && renderModal()}
        </table>
        <div className="p-1">
          <button onClick={openModal} className="btn btn-sm btn-outline w-full">
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dekidaka;
