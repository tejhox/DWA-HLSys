import { useDekidakaContext } from "@/context/dekidakaContext";

const DekidakaTotal = () => {
  return (
    <div className="flex justify-center px-1.5 mt-1 h-full w-full lg:w-1/3">
      <div className="container w-full border-2 border-gray-400 rounded-lg">
        <div className="flex items-center px-2.5 py-1">
          <p className="text-sm">Akumulasi</p>
        </div>
        <hr className="border border-gray-400 mx-1" />
        <div className="px-2 mb-2">
          <table className="table table-sm text-center mt-2">
            <thead className="border-double border-4">
              <tr>
                <th className="border-double border-4 border-gray-700">Jam</th>
                <th className="border-double border-4 border-gray-700">Plan</th>
                <th className="border-double border-4 border-gray-700">
                  Aktual
                </th>
                <th className="border-double border-4 border-gray-700">
                  Deviasi
                </th>
                <th className="border-double border-4 border-gray-700">
                  Loss Time
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DekidakaTotal;