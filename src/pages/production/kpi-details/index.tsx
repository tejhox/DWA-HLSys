import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChartLine } from "@fortawesome/free-solid-svg-icons";
import Wrapper from "@/components/layout/wrapper";
import Container from "@/components/layout/container";
import { useAllStateContext } from "@/context/allStateContext";
import { useGetDataContext } from "@/context/getDataContext";
import { useSessionContext } from "@/context/sessionContext";
import { useEffect } from "react";
import EfficiencyStats from "../../../views/statsViews/efficiencyStats";
import LossTimeKpiStats from "../../../views/statsViews/lossTimeKpiStats";
import PcsPerHourStats from "../../../views/statsViews/pcsPerHourStats";

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
      contentClass={"lg:w-1/3"}
      content={
        <Wrapper
          content={
            <div className="h-screen">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xl font-bold text-primary ms-1">KPI LINE</p>
                <Link
                  href="/production/kpi-charts"
                  className="btn btn-sm btn-ghost">
                  <FontAwesomeIcon
                    className="text-blue-700"
                    icon={faChartLine}
                    size="xl"
                  />
                </Link>
              </div>
              <hr className="border border-gray-400 my-2" />
              <EfficiencyStats />
              <LossTimeKpiStats />
              <PcsPerHourStats />
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
      }
    />
  );
};

export default DailyKpi;
