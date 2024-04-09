import { useGetDataContext } from "@/context/getDataContext";
import { useEffect } from "react";

const DekidakaTotal = () => {
  const {
    profileId,
    totalPlan,
    totalActual,
    totalDeviasi,
    totalLossTime,
    getDekidakaSum,
  } = useGetDataContext();

  return (
    <div className="flex justify-center px-1.5 mt-1 h-full w-full lg:w-1/3">
      <div className="container w-full border-2 rounded-lg bg-gray-200 shadow-md shadow-gray-500/60 mb-1">
        <div className="flex items-center px-2.5 py-1">
          <p className="text-sm text-gray-500">Akumulasi</p>
        </div>
        <hr className="border border-gray-400 mx-1" />
        <div className="px-2 mb-2">
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
    </div>
  );
};

export default DekidakaTotal;
