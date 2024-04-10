import { useProfileContext } from "@/context/profileContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useGetDataContext } from "@/context/getDataContext";
import { useDekidakaContext } from "@/context/dekidakaContext";
import { useAppStateContext } from "@/context/appStateContext";
import { DekidakaData } from "@/context/type/dataType";
import { useModalFunctionContext } from "@/context/modalFunctionContext";
import Container from "@/components/layout/container";

const Dekidaka = () => {
  const { handleShowWarning } = useProfileContext();
  const { getDekidaka, getDekidakaById } = useGetDataContext();
  const { handleAddDekidakaModal } = useDekidakaContext();

  const {
    isModalUpdateDekidakaOpen,
    isModalAddDekidakaOpen,
    isModalDeleteDekidakaOpen,
    dekidakaData,
    isLoading,
    isInputFilled,
    profileId,
  } = useAppStateContext();

  const {
    modalDeleteDekidakaConfirmation,
    modalAddDekidaka,
    modalUpdateDekidaka,
  } = useModalFunctionContext();

  useEffect(() => {
    if (profileId) {
      getDekidaka();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId]);

  return (
    <Container
      content={
        <div>
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
              {dekidakaData
                ?.slice()
                .reverse()
                .map((item: DekidakaData, index: number) => (
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
          <div className="w-full mt-3 mb-0.5">
            <button
              onClick={
                isInputFilled
                  ? handleAddDekidakaModal
                  : () => handleShowWarning()
              }
              className="btn btn-sm text-white bg-blue-700 hover:bg-blue-900 w-full shadow-md shadow-indigo-500/50">
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </button>
            {isModalAddDekidakaOpen && modalAddDekidaka()}
            {isModalUpdateDekidakaOpen && modalUpdateDekidaka()}
            {isModalDeleteDekidakaOpen && modalDeleteDekidakaConfirmation()}
          </div>
        </div>
      }
    />
  );
};

export default Dekidaka;
