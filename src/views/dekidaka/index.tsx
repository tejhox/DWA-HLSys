import { useProfileContext } from "@/context/profileContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useGetDataContext } from "@/context/getDataContext";
import { useDekidakaContext } from "@/context/dekidakaContext";
import { useAllStateContext } from "@/context/allStateContext";
import { DekidakaData } from "@/context/type/dataType";
import { useModalFunctionContext } from "@/context/modalFunctionContext";
import Wrapper from "@/components/layout/wrapper";

const Dekidaka = () => {
  const { handleShowWarning } = useProfileContext();
  const { getDekidakaById } = useGetDataContext();
  const { handleAddDekidakaModal } = useDekidakaContext();

  const {
    isModalAddDekidakaOpen,
    isModalLossTimeDetailsOpen,
    isModalUpdateDekidakaOpen,
    isModalDeleteDekidakaOpen,
    dekidakaData,
    isDekidakaLoading,
    isInputFilled,
  } = useAllStateContext();

  const {
    modalAddDekidaka,
    modalLossTimeDetails,
    modalDeleteDekidakaConfirmation,
    modalUpdateDekidaka,
  } = useModalFunctionContext();

  return (
    <Wrapper
      content={
        <div>
          <div className="hidden lg:block lg:w-full lg:mb-1.5">
            <button
              onClick={
                isInputFilled
                  ? handleAddDekidakaModal
                  : () => handleShowWarning()
              }
              className="btn btn-sm text-white bg-teal-600 hover:bg-blue-900 w-full shadow-md shadow-indigo-500/60">
              <FontAwesomeIcon icon={faPlus} size="lg" />
              Tambah
            </button>
          </div>
          <div className="lg:h-64 lg:overflow-auto">
            <table className="table table-zebra table-sm shadow-md shadow-gray-500/60 text-center">
              <thead className="border border-2">
                <tr className="bg-indigo-600">
                  <th className="border border-2 text-white">Jam</th>
                  <th className="border border-2 text-white">Plan</th>
                  <th className="border border-2 text-white">Aktual</th>
                  <th className="border border-2 text-white">Deviasi</th>
                  <th className="border border-2 text-white">Loss Time</th>
                </tr>
              </thead>
              <tbody>
                {dekidakaData
                  ?.slice()
                  .reverse()
                  .map((item: DekidakaData, index: number) => (
                    <tr
                      onClick={() => getDekidakaById(item.id, index)}
                      className="hover cursor-pointer bg-white"
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
          </div>
          {isDekidakaLoading ? (
            <p className="text-center text-sm my-3">
              <span className="loading loading-dots loading-sm"></span>
            </p>
          ) : !dekidakaData || dekidakaData.length === 0 ? (
            <p className="text-center text-sm my-3">
              -------- Belum Ada Laporan --------
            </p>
          ) : (
            ""
          )}
          <div className="lg:hidden w-full mt-3 mb-2.5">
            <button
              onClick={
                isInputFilled
                  ? handleAddDekidakaModal
                  : () => handleShowWarning()
              }
              className="btn btn-sm text-white bg-blue-700 hover:bg-blue-900 w-full shadow-lg shadow-indigo-500/60">
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </button>
          </div>
          {isModalAddDekidakaOpen && modalAddDekidaka()}
          {isModalUpdateDekidakaOpen && modalUpdateDekidaka()}
          {isModalDeleteDekidakaOpen && modalDeleteDekidakaConfirmation()}
          {isModalLossTimeDetailsOpen && modalLossTimeDetails()}
        </div>
      }
    />
  );
};

export default Dekidaka;
