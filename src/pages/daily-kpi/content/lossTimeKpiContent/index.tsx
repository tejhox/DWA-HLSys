import Card from "@/components/card";
import { useAppStateContext } from "@/context/appStateContext";
import { useGetDataContext } from "@/context/getDataContext";
import { useSessionContext } from "@/context/sessionContext";
import { useEffect } from "react";

const LossTimeKpiContent = () => {
  const {
    kpiId,
    availableTime,
    lossTimeKpi,
    lossTimeRatio,
    isLoading,
    userDataName,
  } = useAppStateContext();

  const { getLastKpi, getLossTimeKpi } = useGetDataContext();

  const { fetchSession, session } = useSessionContext();

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
      getLossTimeKpi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kpiId]);

  return (
    <Card
      cardTitle={
        <div className="container w-full">
          <div className="container flex w-full">
            <p className="font-semibold ">Loss Time % :</p>
            <p className="text-lg font-semibold text-primary text-right">
              {isLoading ? (
                <span className="loading loading-dots loading-xs"></span>
              ) : lossTimeRatio ? (
                `${lossTimeRatio}%`
              ) : lossTimeRatio === undefined ? (
                "~"
              ) : lossTimeRatio === 0 ? (
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
                  Waktu Tersedia<span className="ms-1.5">:</span>
                </p>
                <p className="text-sm text-success font-semibold text-right">
                  {isLoading ? (
                    <span className="loading loading-dots loading-xs"></span>
                  ) : availableTime ? (
                    `${availableTime}%`
                  ) : availableTime === undefined ? (
                    "~"
                  ) : availableTime === 0 ? (
                    "0%"
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </li>
            <li>
              <div className="flex">
                <p className="text-sm font-semibold mt-1">
                  Loss Time <span className="ms-10">:</span>
                </p>
                <p className="text-sm text-error font-semibold text-right mt-1">
                  {isLoading ? (
                    <span className="loading loading-dots loading-xs"></span>
                  ) : lossTimeKpi ? (
                    `${lossTimeKpi}'`
                  ) : lossTimeKpi === undefined ? (
                    "~"
                  ) : lossTimeKpi === 0 ? (
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

export default LossTimeKpiContent;
