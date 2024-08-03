import Wrapper from "@/components/layout/wrapper";
import { useAllStateContext } from "@/context/allStateContext";

const DekidakaTotal = () => {
  const { dekidakaSumData } = useAllStateContext();

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
                  {!dekidakaSumData ? (
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
                      <td className="border-double border-2">
                        {dekidakaSumData?.totalPlan}
                      </td>
                      <td className="border-double border-2 text-blue-700">
                        {dekidakaSumData?.totalActual}
                      </td>
                      <td className="border-double border-2 ">
                        {dekidakaSumData?.totalDeviasi}
                      </td>
                      <td className="border-double border-2 text-error">
                        {`${dekidakaSumData?.totalLossTime}'`}
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
