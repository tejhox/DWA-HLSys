import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useProfileContext } from "../../../../context/profileContext";
import {
  SubDekidaka,
  useDekidakaContext,
} from "../../../../context/dekidakaContext";

const Dekidaka = () => {
  const [userData, setUserData] = useState<any>(null);
  const [dateNow, setDateNow] = useState<any>("");
  const { data: session } = useSession<any>();

  const { showWarning, isFilled } = useProfileContext();
  const { getDekidakaById, modalAddData, modalUpdateData } =
    useDekidakaContext();

  const { isModalAddOpen, isModalUpdateOpen, handleAddModal, subDekidaka } =
    useDekidakaContext();

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

  return (
    <div className="flex justify-center px-3 mt-1 h-full w-full lg:w-1/3">
      <div className="container w-full border-2 border-gray-400 rounded-lg p-2">
        <table className="table table-sm text-center">
          <thead className="border-double border-4">
            <tr>
              <th className="border-double border-4 border-gray-700">Jam</th>
              <th className="border-double border-4 border-gray-700">Plan</th>
              <th className="border-double border-4 border-gray-700">Aktual</th>
              <th className="border-double border-4 border-gray-700">
                Deviasi
              </th>
              <th className="border-double border-4 border-gray-700">
                Loss Time
              </th>
            </tr>
          </thead>
          <tbody>
            {subDekidaka?.map((item: SubDekidaka, index: number) => (
              <tr
                onClick={() => getDekidakaById(item.id)}
                className="hover"
                key={item.id}>
                <td className="border-double border-4 border-gray-700">
                  {index + 1}
                </td>
                <td className="border-double border-4 border-gray-700">
                  {item.plan}
                </td>
                <td className="border-double border-4 border-gray-700">
                  {item.actual}
                </td>
                <td className="border-double border-4 border-gray-700">
                  {item.deviasi}
                </td>
                <td className="border-double border-4 border-gray-700">
                  {`${item.lossTime}'`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!subDekidaka || subDekidaka.length === 0 ? (
          <p className="text-center text-sm my-3">
            -------- Belum ada data --------
          </p>
        ) : (
          ""
        )}
        <div className="w-full mt-2">
          <button
            onClick={isFilled ? handleAddModal : () => showWarning()}
            className="btn btn-sm btn-neutral w-full">
            +
          </button>
          {isModalAddOpen && modalAddData()}
          {isModalUpdateOpen && modalUpdateData()}
        </div>
      </div>
    </div>
  );
};

export default Dekidaka;
