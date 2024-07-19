import Wrapper from "@/components/layout/wrapper";
import { useAllStateContext } from "@/context/allStateContext";

const DekidakaTotal = () => {
  const {
    dekidakaSumData,
    totalPlan,
    totalActual,
    totalDeviasi,
    totalLossTime,
  } = useAllStateContext();

  return (
    <Wrapper
      content={
        <div>
          <div className="flex items-center py-1">
            <p className="text-sm text-gray-500 ms-1">Akumulasi</p>
          </div>
          <hr className="border border-gray-400" />
          <div className="mb-2">
            <table className="table table-sm shadow-md shadow-gray-500/60 text-center mt-2">
              <thead className="border border-2">
                <tr className="bg-indigo-600">
                  <th className="border border-2 text-white">Plan</th>
                  <th className="border border-2 text-white">Aktual</th>
                  <th className="border border-2 text-white">Deviasi</th>
                  <th className="border border-2 text-white">Loss Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  {!dekidakaSumData || dekidakaSumData.length === 0 ? (
                    <>
                      <td className="border-double border-2">-</td>
                      <td className="border-double border-2 text-blue-700">
                        -
                      </td>
                      <td className="border-double border-2 ">-</td>
                      <td className="border-double border-2 text-error">-</td>
                    </>
                  ) : (
                    <>
                      <td className="border-double border-2">{totalPlan}</td>
                      <td className="border-double border-2 text-blue-700">
                        {totalActual}
                      </td>
                      <td className="border-double border-2 ">
                        {totalDeviasi}
                      </td>
                      <td className="border-double border-2 text-error">
                        {`${totalLossTime}'`}
                      </td>
                    </>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      }
    />
  );
};

export default DekidakaTotal;
