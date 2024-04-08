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
    <div className="flex justify-center px-1.5 mt-2 h-full w-full lg:w-1/3">
      <div className="container w-full border-2 rounded-lg bg-gray-50 shadow-md shadow-gray-500/60 px-1 py-1 mb-1">
        <div>
          <p className="text-center font-semibold">
            <span className="text-primary">EFISIENSI </span> ({monthName})
          </p>
        </div>
        <EfficiencyChart />
      </div>
    </div>
  );
};

export default MonthlyKpi;
