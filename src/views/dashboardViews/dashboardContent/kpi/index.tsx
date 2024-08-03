import { useAllStateContext } from "@/context/allStateContext";
import { useGetDataContext } from "@/context/getDataContext";
import { useSessionContext } from "@/context/sessionContext";
import CycleTimeActualChart from "@/views/chartsViews/cycleTimeActualChart";
import EfficiencyChart from "@/views/chartsViews/efficiencyChart";
import LossTimeChart from "@/views/chartsViews/lossTimeKpiChart";
import PcsPerHourChart from "@/views/chartsViews/pcsPerHourChart";
import ProductivityChart from "@/views/chartsViews/productivityChart";
import { ChangeEvent, useEffect, useState } from "react";

const KpiViews = () => {
  const { getKpiDataByLine, getKpiDataByGroup } = useGetDataContext();
  const { kpiData } = useAllStateContext();
  const { fetchSession, session } = useSessionContext();
  const [selectedLineOption, setSelectedLineOption] = useState("ER01");
  const [selectedGroupOption, setSelectedGroupOption] = useState("1");

  const handleSelectLine = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedLineOption(value);
    if (value === "ER01") {
      getKpiDataByLine("ER01");
    } else if (value === "ER02") {
      getKpiDataByLine("ER02");
    } else if (value === "ER03") {
      getKpiDataByLine("ER03");
    } else if (value === "ER150") {
      getKpiDataByLine("ER150");
    }
  };

  const handleSelectGroup = async (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedGroupOption(value);
    if (value === "1") {
      getKpiDataByGroup(selectedLineOption, "1");
    } else if (value === "2") {
      getKpiDataByGroup(selectedLineOption, "2");
    }
  };

  useEffect(() => {
    fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    getKpiDataByLine("ER01");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);
  return (
    <div className="w-full">
      <div className="flex flex-1 justify-between bg-blue-700 shadow shadow-gray-400 rounded py-2 px-3">
        <h1 className="text-xl font-bold text-white">
          Leader : {kpiData?.[0]?.leader ? kpiData?.[0]?.leader : "-"}
        </h1>
        <div className="flex">
          <select
            className="select select-sm select-bordered"
            value={selectedLineOption}
            onChange={handleSelectLine}>
            <option>Line</option>
            <option value="ER01">ER01</option>
            <option value="ER02">ER02</option>
            <option value="ER03">ER03</option>
            <option value="ER150">ER150</option>
          </select>
          <select
            value={selectedGroupOption}
            onChange={handleSelectGroup}
            className="select select-sm select-bordered ms-2">
            <option>Group</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
      </div>
      <div className="flex bg-indigo-400 rounded-lg p-4 mt-2">
        <div
          className="flex-1 border-2 rounded-lg p-2 bg-white"
          style={{ height: "300px" }}>
          <h2 className="text-center font-bold">EFISIENSI</h2>
          <EfficiencyChart marBot={45} />
        </div>
        <div
          className="flex-1 border-2 rounded-lg ms-2 p-2 bg-white"
          style={{ height: "300px" }}>
          <h2 className="text-center font-bold">LOSS TIME</h2>
          <LossTimeChart marBot={45} />
        </div>
      </div>
      <div className="flex bg-indigo-400  rounded-lg p-4 mt-2">
        <div
          className="flex-1 border-2 rounded-lg p-2 bg-white"
          style={{ height: "300px" }}>
          <h2 className="text-center font-bold">PCS/HOUR</h2>
          <PcsPerHourChart marBot={45} />
        </div>
        <div
          className="flex-1 border-2 rounded-lg p-2 ms-2 bg-white"
          style={{ height: "300px" }}>
          <h2 className="text-center font-bold">PRODUCTIVITY (UNIT/MHR)</h2>
          <ProductivityChart marBot={45} />
        </div>
        <div
          className="flex-1 border-2 rounded-lg p-2 ms-2 bg-white"
          style={{ height: "300px" }}>
          <h2 className="text-center font-bold">CYCLE TIME ACTUAL</h2>
          <CycleTimeActualChart marBot={45} />
        </div>
      </div>
    </div>
  );
};

export default KpiViews;
