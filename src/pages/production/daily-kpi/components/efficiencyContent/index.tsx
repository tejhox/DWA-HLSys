import Card from "@/components/card";
import { useAllStateContext } from "@/context/allStateContext";

const EfficiencyContent = () => {
  const { availableTime, effectiveTime, efficiency, isDekidakaLoading } =
    useAllStateContext();

  return (
    <Card
      cardClass={"bg-white mb-2.5 lg:me-2"}
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
          <hr className="border border-gray-400" />
        </div>
      }
      cardBody={
        <div className="container w-full">
          <ul className="list-disc ms-6">
            <li>
              <div className="flex">
                <p className="text-sm font-semibold">
                  Waktu Tersedia (Menit)<span className="ms-1">:</span>
                </p>
                <p className="text-sm text-success font-semibold text-right">
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
              <div className="flex">
                <p className="text-sm font-semibold mt-1">
                  Waktu Efektif (Menit) <span className="ms-3">:</span>
                </p>
                <p className="text-sm text-yellow-600 font-semibold text-right mt-1">
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
  );
};

export default EfficiencyContent;
