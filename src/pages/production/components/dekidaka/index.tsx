import { useProfileContext } from "@/context/profileContext";
import { useDekidakaContext } from "@/context/dekidakaContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { SubDekidaka, useGetDataContext } from "@/context/getDataContext";

const Dekidaka = () => {
  const { handleShowWarning } = useProfileContext();
  const { modalAddData, modalUpdateData } = useDekidakaContext();
  const { getDekidakaById, subDekidaka, isLoading, isInputFilled } =
    useGetDataContext();
  const {
    isModalAddOpen,
    isModalUpdateOpen,
    isDeleteConfirmOpen,
    handleAddModal,
    modalDeleteConfirmation,
  } = useDekidakaContext();

  return (
    <div className="flex justify-center px-1.5 mt-1 h-full w-full lg:w-1/3">
      <div className="container w-full border-2 border-gray-400 rounded-lg p-2">
        <table className="table table-zebra table-sm text-center">
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
            {subDekidaka
              ?.slice()
              .reverse()
              .map((item: SubDekidaka, index: number) => (
                <tr
                  onClick={() => getDekidakaById(item.id, index)}
                  className="hover"
                  key={item.id}>
                  <td className="border-double border-4 border-gray-700">
                    {index + 1}
                  </td>
                  <td className="border-double border-4 border-gray-700 text-info">
                    {item.plan}
                  </td>
                  <td className="border-double border-4 border-gray-700 text-success">
                    {item.actual}
                  </td>
                  <td className="border-double border-4 border-gray-700 text-warning">
                    {item.deviasi}
                  </td>
                  <td className="border-double border-4 border-gray-700 text-error">
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
            -------- Belum Ada Data --------
          </p>
        ) : (
          ""
        )}

        <div className="w-full mt-2">
          <button
            onClick={isInputFilled ? handleAddModal : () => handleShowWarning()}
            className="btn btn-sm btn-neutral w-full">
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
