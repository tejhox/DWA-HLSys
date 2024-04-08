import { useProfileContext } from "@/context/profileContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { SubDekidaka, useGetDataContext } from "@/context/getDataContext";
import { useDekidakaContext } from "@/context/dekidakaContext";
import { useSessionContext } from "@/context/sessionContext";

const Dekidaka = () => {
  const { handleShowWarning } = useProfileContext();
  const {
    getDekidaka,
    getDekidakaById,
    subDekidaka,
    isLoading,
    isInputFilled,
  } = useGetDataContext();

  const {
    isModalAddOpen,
    isModalUpdateOpen,
    isDeleteConfirmOpen,
    handleAddModal,
    modalDeleteConfirmation,
    modalAddData,
    modalUpdateData,
  } = useDekidakaContext();

  const { dateNow } = useSessionContext();

  useEffect(() => {
    getDekidaka();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateNow]);

  return (
    <div className="flex justify-center px-1.5 mt-1 h-full w-full lg:w-1/3">
      <div className="container w-full border-2 rounded-lg bg-gray-200 shadow-md shadow-gray-500/60 p-2">
        <table className="table table-zebra table-sm text-center">
          <thead className="border border-2">
            <tr className="bg-slate-500">
              <th className="border border-2 text-white">Jam</th>
              <th className="border border-2 text-white">Plan</th>
              <th className="border border-2 text-white">Aktual</th>
              <th className="border border-2 text-white">Deviasi</th>
              <th className="border border-2 text-white">Loss Time</th>
            </tr>
          </thead>
          <tbody>
            {subDekidaka
              ?.slice()
              .reverse()
              .map((item: SubDekidaka, index: number) => (
                <tr
                  onClick={() => getDekidakaById(item.id, index)}
                  className="hover bg-white"
                  key={item.id}>
                  <td className="border border-2">{index + 1}</td>
                  <td className="border border-2">{item.plan}</td>
                  <td className="border border-2 text-blue-700">
                    {item.actual}
                  </td>
                  <td className="border border-2">{item.deviasi}</td>
                  <td className="border border-2 text-error">
                    {`${item.lossTime}'`}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {isLoading ? (
          <p className="text-center text-sm my-3">Loading ....</p>
        ) : !subDekidaka || subDekidaka.length === 0 ? (
          <p className="text-center text-sm my-3">
            -------- Belum Ada Laporan --------
          </p>
        ) : (
          ""
        )}

        <div className="w-full mt-2 mb-0.5">
          <button
            onClick={isInputFilled ? handleAddModal : () => handleShowWarning()}
            className="btn btn-sm text-white bg-blue-700 hover:bg-blue-900 w-full shadow-md shadow-indigo-500/50">
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </button>
          {isModalAddOpen && modalAddData()}
          {isModalUpdateOpen && modalUpdateData()}
          {isDeleteConfirmOpen && modalDeleteConfirmation()}
        </div>
      </div>
    </div>
  );
};

export default Dekidaka;
