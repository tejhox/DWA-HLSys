import Card from "@/components/card";
import EfficiencyChart from "./components/efficiencyChart";
import LossTimeChart from "./components/lossTimeKpiChart";
import Container from "@/components/layout/container";
import Wrapper from "@/components/layout/wrapper";
import { useGetDataContext } from "@/context/getDataContext";
import { useAllStateContext } from "@/context/allStateContext";
import { useSessionContext } from "@/context/sessionContext";
import { useEffect } from "react";

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
                cardBody={<EfficiencyChart />}
              />
              <div className="mt-3">
                <Card
                  cardTitle={
                    <p className="text-center font-semibold">
                      <span className="text-primary">LOSS TIME </span> (
                      {monthName})
                    </p>
                  }
                  cardBody={<LossTimeChart />}
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
