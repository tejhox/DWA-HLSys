import Card from "@/components/card";
import EfficiencyChart from "../../../views/chartsViews/efficiencyChart";
import LossTimeChart from "../../../views/chartsViews/lossTimeKpiChart";
import Container from "@/components/layout/container";
import Wrapper from "@/components/layout/wrapper";
import { useGetDataContext } from "@/context/getDataContext";
import { useAllStateContext } from "@/context/allStateContext";
import { useSessionContext } from "@/context/sessionContext";
import { useEffect } from "react";
import PcsPerHourChart from "../../../views/chartsViews/pcsPerHourChart";
import ProductivityChart from "@/views/chartsViews/productivityChart";
import CycleTimeActualChart from "@/views/chartsViews/cycleTimeActualChart";

const MonthlyKpi = () => {
  const { getLastKpiDoc, getAllKpiData } = useGetDataContext();
  const { kpiId, userDataName } = useAllStateContext();
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
      getAllKpiData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kpiId]);

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
    <Container
      contentClass={"h-full lg:w-1/3"}
      content={
        <Wrapper
          content={
            <div>
              <p className="text-xl text-primary font-bold ms-1">KPI LINE</p>
              <hr className="border border-gray-400 my-2" />
              <Card
                cardTitle={
                  <p className="text-center font-semibold">
                    <span className="text-primary">EFISIENSI </span> (
                    {monthName})
                  </p>
                }
                cardBody={<EfficiencyChart marBot={10} />}
              />
              <div className="mt-3">
                <Card
                  cardTitle={
                    <p className="text-center font-semibold">
                      <span className="text-primary">LOSS TIME </span> (
                      {monthName})
                    </p>
                  }
                  cardBody={<LossTimeChart marBot={10} />}
                />
              </div>
              <div className="mt-3">
                <Card
                  cardTitle={
                    <p className="text-center font-semibold">
                      <span className="text-primary">PCS PER HOUR </span> (
                      {monthName})
                    </p>
                  }
                  cardBody={<PcsPerHourChart marBot={10} />}
                />
              </div>
              <div className="mt-3">
                <Card
                  cardTitle={
                    <p className="text-center font-semibold">
                      <span className="text-primary">PRODUCTIVITY</span> (
                      {monthName})
                    </p>
                  }
                  cardBody={<ProductivityChart marBot={10} />}
                />
              </div>
              <div className="mt-3">
                <Card
                  cardTitle={
                    <p className="text-center font-semibold">
                      <span className="text-primary">CYCLE TIME ACTUAL</span> (
                      {monthName})
                    </p>
                  }
                  cardBody={<CycleTimeActualChart marBot={10} />}
                />
              </div>
            </div>
          }
        />
      }
    />
  );
};

export default MonthlyKpi;
