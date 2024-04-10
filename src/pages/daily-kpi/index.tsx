import Link from "next/link";
import EfficiencyContent from "./content/efficiencyContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChartLine } from "@fortawesome/free-solid-svg-icons";
import GeneralLayout from "@/components/layout/generalLayout";
import LossTimeKpiContent from "./content/lossTimeKpiContent";

const DailyKpi = () => {
  return (
    <GeneralLayout
      content={
        <div className="container w-full relative mt-2 p-2 border-2 rounded-lg bg-gray-200 shadow-md shadow-gray-500/60">
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
          <LossTimeKpiContent />
          <div className="flex mt-2 justify-end">
            <Link
              href={"/production"}
              className="btn btn-sm btn-circle btn-neutral">
              <FontAwesomeIcon icon={faArrowLeft} size="xl" />
            </Link>
          </div>
        </div>
      }
    />
  );
};

export default DailyKpi;
