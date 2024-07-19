import React from "react";
import Card from "@/components/card";
import { useAllStateContext } from "@/context/allStateContext";

const KpiStats = () => {
  const {
    availableTime,
    effectiveTime,
    efficiency,
    isDekidakaLoading,
    lossTimeKpi,
    lossTimeRatio,
  } = useAllStateContext();

  return (
    <div className="flex mt-1.5">
      <Card
        cardClass={"bg-gray-50/70 lg:me-2"}
        cardTitle={
          <div className="container w-full">
            <div className="container flex w-full">
              <p className="font-semibold ">Efisiensi :</p>
              <p className="text-lg font-semibold text-primary text-right">
                {isDekidakaLoading ? (
                  <span className="loading loading-dots loading-xs"></span>
                ) : efficiency ? (
                  `${efficiency}%`
                ) : efficiency === undefined ? (
                  "~"
                ) : efficiency === 0 ? (
                  "0%"
                ) : (
                  ""
                )}
              </p>
            </div>
            <hr className="border border-gray-400 mt-2" />
          </div>
        }
        cardBody={
          <div className="container w-full">
            <ul className="list-disc ms-6">
              <li>
                <div className="flex mt-2">
                  <p className="font-semibold">
                    Waktu Tersedia (Menit)<span className="ms-1">:</span>
                  </p>
                  <p className="text-success font-semibold text-right">
                    {isDekidakaLoading ? (
                      <span className="loading loading-dots loading-xs"></span>
                    ) : availableTime ? (
                      `${availableTime}`
                    ) : availableTime === undefined ? (
                      "~"
                    ) : availableTime === 0 ? (
                      "0"
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              </li>
              <li>
                <div className="flex mt-3">
                  <p className="font-semibold">
                    Waktu Efektif (Menit) <span className="ms-3">:</span>
                  </p>
                  <p className="text-yellow-600 font-semibold text-right">
                    {isDekidakaLoading ? (
                      <span className="loading loading-dots loading-xs"></span>
                    ) : effectiveTime ? (
                      `${effectiveTime}`
                    ) : effectiveTime === undefined ? (
                      "~"
                    ) : effectiveTime === 0 ? (
                      "0"
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
      <Card
        cardClass={"bg-gray-50/70"}
        cardTitle={
          <div className="container w-full">
            <div className="flex w-full">
              <p className="font-semibold ">Loss Time % :</p>
              <p className="text-lg font-semibold text-primary text-right">
                {isDekidakaLoading ? (
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
            <hr className="border border-gray-400 mt-2" />
          </div>
        }
        cardBody={
          <div className="container w-full">
            <ul className="list-disc ms-6">
              <li>
                <div className="flex mt-2">
                  <p className="font-semibold">
                    Waktu Tersedia (Menit)<span className="ms-1.5">:</span>
                  </p>
                  <p className="text-success font-semibold text-right">
                    {isDekidakaLoading ? (
                      <span className="loading loading-dots loading-xs"></span>
                    ) : availableTime ? (
                      `${availableTime}`
                    ) : availableTime === undefined ? (
                      "~"
                    ) : availableTime === 0 ? (
                      "0"
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              </li>
              <li>
                <div className="flex mt-3">
                  <p className="font-semibold">
                    Loss Time (Menit) <span className="ms-11">:</span>
                  </p>
                  <p className="text-error font-semibold text-right">
                    {isDekidakaLoading ? (
                      <span className="loading loading-dots loading-xs"></span>
                    ) : lossTimeKpi ? (
                      `${lossTimeKpi}`
                    ) : lossTimeKpi === undefined ? (
                      "~"
                    ) : lossTimeKpi === 0 ? (
                      "0"
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
    </div>
  );
};

export default KpiStats;
