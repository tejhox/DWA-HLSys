import { useState, FormEvent, useEffect } from "react";
import axios from "axios";

const Dekidaka = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plan, setPlan] = useState<number>(0);
  const [actual, setActual] = useState<number>(0);
  const [deviasi, setDeviasi] = useState<number>(0);
  const [lossTime, setLossTime] = useState<number>(0);
  const [dekidakaData, setDekidakaData] = useState<any>(null);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/addDekidaka", {
        plan,
        actual,
        deviasi,
        lossTime,
      });
      console.log("Data added successfully!");
      setIsModalOpen(false);
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
                value={deviasi}
                onChange={(e) => setDeviasi(parseInt(e.target.value))}
              />
              <label className="label">Loss Time</label>
              <input
                type="number"
                className="input input-bordered input-sm w-full"
                value={lossTime}
                onChange={(e) => setLossTime(parseInt(e.target.value))}
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
    <div className="flex justify-center px-2 h-full w-full lg:w-1/3">
      <div className="container w-full border rounded-lg px-1">
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
            <tr
              onClick={openModal}
              className="cursor-pointer hover:bg-slate-900">
              <td>1</td>
              <td>55</td>
              <td>55</td>
              <td>0</td>
              <td>0</td>
            </tr>
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
