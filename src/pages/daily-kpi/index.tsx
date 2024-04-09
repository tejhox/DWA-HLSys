import Link from "next/link";
import EfficiencyContent from "./content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChartLine } from "@fortawesome/free-solid-svg-icons";

const DailyKpi = () => {
  return (
    <div className="flex flex-col justify-center px-1.5 mt-2 h-full w-full lg:w-1/3">
      <div className="container w-full p-2 shadow-md bg-gray-200 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xl font-bold text-primary ms-1">KPI LINE</p>
          <Link
            href="/monthly-kpi"
            className="btn btn-sm btn-ghost btn-primary">
            <FontAwesomeIcon
              className="text-blue-500"
              icon={faChartLine}
              size="xl"
            />
          </Link>
        </div>
        <hr className="border border-gray-400 my-2" />
        <EfficiencyContent />
        <EfficiencyContent />
        <EfficiencyContent />
        <div className="flex mt-3 mb-1 justify-end">
          <Link
            href={"/production"}
            className="btn btn-sm btn-circle btn-neutral">
            <FontAwesomeIcon icon={faArrowLeft} className="mt-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DailyKpi;
