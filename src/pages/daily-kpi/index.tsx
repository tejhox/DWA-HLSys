import Card from "@/components/card";
import { useGetDataContext } from "@/context/GetDataContext";
import { useSessionContext } from "@/context/SessionContext";
import { useEffect } from "react";

const DailyKpi = () => {
  const {
    kpiId,
    availableTime,
    effectiveTime,
    efficiency,
    getLastKpi,
    getEfficiency,
    getAllEfficiency,
  } = useGetDataContext();

  const { session, userDataName, dateNow } = useSessionContext();

  useEffect(() => {
    if (userDataName) {
      getLastKpi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    if (kpiId) {
      getEfficiency();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [efficiency]);

  useEffect(() => {
    getAllEfficiency();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateNow]);

  return (
    <div className="container flex flex-col justify-center w-full p-2 lg:w-1/3 ">
      <Card
        cardBody={
          <div>
            <p className="font-semibold">
              Efisiensi :
              <span className="text-lg font-semibold text-primary ms-2">
                {efficiency ? `${efficiency}%` : `${0}%`}
              </span>
            </p>
            <hr className="border border-gray-400" />
            <div>
              <p className="text-sm">
                Waktu Tersedia : {availableTime ? `${availableTime}'` : `${0}'`}
              </p>
              <p className="text-sm">
                Waktu Efektif : {effectiveTime ? `${effectiveTime}'` : `${0}'`}
              </p>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default DailyKpi;
