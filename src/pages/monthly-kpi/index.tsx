import Card from "@/components/card";
import EfficiencyChart from "@/components/charts/efficiencyChart";

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
    <div className="flex flex-col justify-center px-1.5 mt-2 h-full w-full lg:w-1/3">
      <div className="container w-full p-2 shadow-md bg-gray-200 rounded-lg">
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
                <span className="text-primary">EFISIENSI </span> ({monthName})
              </p>
            }
            cardBody={<EfficiencyChart />}
          />
        </div>
        <div className="mt-3">
          <Card
            cardTitle={
              <p className="text-center font-semibold">
                <span className="text-primary">EFISIENSI </span> ({monthName})
              </p>
            }
            cardBody={<EfficiencyChart />}
          />
        </div>
      </div>
    </div>
  );
};

export default MonthlyKpi;
