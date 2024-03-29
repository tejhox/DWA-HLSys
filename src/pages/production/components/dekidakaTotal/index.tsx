import { useDekidakaContext } from "@/context/dekidakaContext";
const DekidakaTotal = () => {
  // const [dekidakaTotal, setDekidakaTotal] = useState<any>();
  // const [totalPlan, setTotalPlan] = useState<number>();
  // const [totalActual, setTotalActual] = useState<number>();
  // const [totalDeviasi, setTotalDeviasi] = useState<number>();
  // const [totalLossTime, setTotalLossTime] = useState<number>();

  // const { userData, userDataName, dateNow } = useSessionContext();

  // useEffect(() => {
  //   getDekidakaSum();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dateNow]);

  // const getDekidakaSum = async () => {
  //   try {
  //     const storedLastDocId = localStorage.getItem("profileDocId") || "";
  //     if (storedLastDocId) {
  //       const [username, id] = storedLastDocId.split("_");
  //       if (userDataName && userData) {
  //         if (username === userDataName) {
  //           const response = await axios.get(`/api/getDekidakaSum?id=${id}`);
  //           setTotalPlan(response.data.totalPlan);
  //           setTotalActual(response.data.totalActual);
  //           setTotalDeviasi(response.data.totalDeviasi);
  //           setTotalLossTime(response.data.totalLossTime);
  //           setDekidakaTotal(response.data);
  //           console.log(response.data.totalPlan);
  //         } else {
  //           console.log("Username tidak cocok");
  //         }
  //       }
  //     } else {
  //       console.log("Data tidak ditemukan");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const { totalPlan, totalActual, totalDeviasi, totalLossTime } =
    useDekidakaContext();

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
            <tbody>
              <tr>
                <td className="border-double border-4 border-gray-700">
                  {totalPlan}
                </td>
                <td className="border-double border-4 border-gray-700">
                  {totalActual}
                </td>
                <td className="border-double border-4 border-gray-700">
                  {totalDeviasi}
                </td>
                <td className="border-double border-4 border-gray-700">{`${totalLossTime}'`}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DekidakaTotal;
