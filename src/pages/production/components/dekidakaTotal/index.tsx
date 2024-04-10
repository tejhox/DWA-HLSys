import Container from "@/components/layout/container";
import { useAppStateContext } from "@/context/appStateContext";
import { useGetDataContext } from "@/context/getDataContext";
import { useEffect } from "react";

const DekidakaTotal = () => {
  const { getDekidakaSum } = useGetDataContext();

  const { profileId, totalPlan, totalActual, totalDeviasi, totalLossTime } =
    useAppStateContext();

  useEffect(() => {
    if (profileId) {
      getDekidakaSum();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileId]);

  return (
    <Container
      content={
        <div>
          <div className="flex items-center py-1">
            <p className="text-sm text-gray-500 ms-1">Akumulasi</p>
          </div>
          <hr className="border border-gray-400" />
          <div className="mb-2">
            <table className="table table-sm  text-center mt-2">
              <thead className="border border-2">
                <tr className="bg-slate-500">
                  <th className="border border-2 text-white">Plan</th>
                  <th className="border border-2 text-white">Aktual</th>
                  <th className="border border-2 text-white">Deviasi</th>
                  <th className="border border-2 text-white">Loss Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border-double border-2">
                    {totalPlan ? totalPlan : 0}
                  </td>
                  <td className="border-double border-2 text-blue-700">
                    {totalActual ? totalActual : 0}
                  </td>
                  <td className="border-double border-2 ">
                    {totalDeviasi ? totalDeviasi : 0}
                  </td>
                  <td className="border-double border-2 text-error">
                    {totalLossTime ? `${totalLossTime}'` : `${0}'`}
                  </td>
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
