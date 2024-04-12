import Link from "next/link";
import EfficiencyContent from "./content/efficiencyContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChartLine } from "@fortawesome/free-solid-svg-icons";
import LossTimeKpiContent from "./content/lossTimeKpiContent";
import Wrapper from "@/components/layout/wrapper";
import Container from "@/components/layout/container";
import { useAllStateContext } from "@/context/allStateContext";
import { useGetDataContext } from "@/context/getDataContext";
import { useSessionContext } from "@/context/sessionContext";
import { useEffect } from "react";

const DailyKpi = () => {
  const { kpiId, userDataName } = useAllStateContext();

  const { getLastKpiDoc, getDailyKpi } = useGetDataContext();

  const { fetchSession, session } = useSessionContext();

  useEffect(() => {
    fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    if (userDataName) {
      getLastKpiDoc();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDataName]);

  useEffect(() => {
    if (kpiId) {
      getDailyKpi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kpiId]);

  return (
    <Container
      content={
        <Wrapper
          content={
            <div className="h-screen">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xl font-bold text-primary ms-1">KPI LINE</p>
                <Link href="/monthly-kpi" className="btn btn-sm btn-ghost">
                  <FontAwesomeIcon
                    className="text-blue-700"
                    icon={faChartLine}
                    size="xl"
                  />
                </Link>
              </div>
              <hr className="border border-gray-400 my-2" />
              <EfficiencyContent />
              <LossTimeKpiContent />
              <div className="flex mt-4 justify-end">
                <Link
                  href={"/production"}
                  className="btn btn-sm btn-circle btn-neutral">
                  <FontAwesomeIcon icon={faArrowLeft} size="xl" />
                </Link>
              </div>
            </div>
          }
        />
      }
    />
  );
};

export default DailyKpi;
