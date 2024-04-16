import Card from "@/components/card";
import { useAllStateContext } from "@/context/allStateContext";

const PcsPerHourContent = () => {
  const { totalProduction, effectiveHour, pcsPerHour, isDekidakaLoading } =
    useAllStateContext();

  return (
    <Card
      cardTitle={
        <div className="container w-full">
          <div className="container flex w-full">
            <p className="font-semibold ">Pcs Per Hour :</p>
            <p className="text-lg font-semibold text-primary text-right">
              {isDekidakaLoading ? (
                <span className="loading loading-dots loading-xs"></span>
              ) : pcsPerHour ? (
                `${pcsPerHour}`
              ) : pcsPerHour === undefined ? (
                "~"
              ) : pcsPerHour === 0 ? (
                "0"
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
                  Total Produksi<span className="ms-1">:</span>
                </p>
                <p className="text-sm text-success font-semibold text-right">
                  {isDekidakaLoading ? (
                    <span className="loading loading-dots loading-xs"></span>
                  ) : totalProduction ? (
                    `${totalProduction}`
                  ) : totalProduction === undefined ? (
                    "~"
                  ) : totalProduction === 0 ? (
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
                  Waktu Efektif (Jam) <span className="ms-3">:</span>
                </p>
                <p className="text-sm text-yellow-600 font-semibold text-right mt-1">
                  {isDekidakaLoading ? (
                    <span className="loading loading-dots loading-xs"></span>
                  ) : effectiveHour ? (
                    `${effectiveHour}`
                  ) : effectiveHour === undefined ? (
                    "~"
                  ) : effectiveHour === 0 ? (
                    `0`
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

export default PcsPerHourContent;
