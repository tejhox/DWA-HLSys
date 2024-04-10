import Card from "@/components/card";
import EfficiencyChart from "@/components/charts/efficiencyChart";
import LossTimeChart from "@/components/charts/lossTimeKpiChart";
import GeneralLayout from "@/components/layout/generalLayout";

const MonthlyKpi = () => {
  const months = [
    "JANUARI",
    "FEBRUARI",
    "MARET",
    "APRIL",
    "MEI",
    "JUNI",
    "JULI",
    "AGUSTUS",
    "SEPTEMBER",
    "OKTOBER",
    "NOVEMBER",
    "DESEMBER",
  ];

  const monthIndex = new Date().getMonth();
  const monthName = months[monthIndex];

  return (
    <GeneralLayout
      content={
        <div className="container w-full relative mt-2 p-2 border-2 rounded-lg bg-gray-200 shadow-md shadow-gray-500/60">
          <p className="text-xl text-primary font-bold ms-1">KPI LINE</p>
          <hr className="border border-gray-400 my-2" />
          <Card
            cardTitle={
              <p className="text-center font-semibold">
                <span className="text-primary">EFISIENSI </span> ({monthName})
              </p>
            }
            cardBody={<EfficiencyChart />}
          />
          <div className="mt-3">
            <Card
              cardTitle={
                <p className="text-center font-semibold">
                  <span className="text-primary">LOSS TIME </span> ({monthName})
                </p>
              }
              cardBody={<LossTimeChart />}
            />
          </div>
        </div>
      }
    />
  );
};

export default MonthlyKpi;
