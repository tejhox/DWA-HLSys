import Card from "@/components/card";
import { useGetDataContext } from "@/context/getDataContext";
import { useSessionContext } from "@/context/sessionContext";
import { useEffect } from "react";

const EfficiencyContent = () => {
  const {
    kpiId,
    availableTime,
    effectiveTime,
    efficiency,
    getLastKpi,
    getEfficiency,
    isLoading,
  } = useGetDataContext();

  const { fetchSession, userDataName, session } = useSessionContext();

  useEffect(() => {
    fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    if (userDataName) {
      getLastKpi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDataName]);

  useEffect(() => {
    if (kpiId) {
      getEfficiency();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kpiId]);

  return (
    <Card
      cardTitle={
        <div className="container w-full">
          <div className="container flex w-full">
            <p className="font-semibold ">Efisiensi :</p>
            <p className="text-lg font-semibold text-primary text-right">
              {isLoading ? (
                <span className="loading loading-dots loading-xs"></span>
              ) : efficiency ? (
                `${efficiency}'`
              ) : efficiency === undefined ? (
                "~"
              ) : efficiency === 0 ? (
                "0%"
              ) : (
                ""
              )}
            </p>
          </div>
          <hr className="border border-gray-400" />
        </div>
      }
      cardBody={
        <div className="container w-full">
          <ul className="list-disc ms-6">
            <li>
              <div className="flex">
                <p className="text-sm font-semibold">
                  Waktu Tersedia<span className="ms-1">:</span>
                </p>
                <p className="text-sm text-success font-semibold text-right">
                  {isLoading ? (
                    <span className="loading loading-dots loading-xs"></span>
                  ) : availableTime ? (
                    `${availableTime}'`
                  ) : !availableTime ? (
                    "~"
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </li>
            <li>
              <div className="flex">
                <p className="text-sm font-semibold mt-1">
                  Waktu Efektif <span className="ms-3">:</span>
                </p>
                <p className="text-sm text-yellow-600 font-semibold text-right mt-1">
                  {isLoading ? (
                    <span className="loading loading-dots loading-xs"></span>
                  ) : effectiveTime ? (
                    `${effectiveTime}'`
                  ) : effectiveTime === undefined ? (
                    "~"
                  ) : effectiveTime === 0 ? (
                    "0'"
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </li>
          </ul>
        </div>
      }
    />
  );
};

export default EfficiencyContent;
