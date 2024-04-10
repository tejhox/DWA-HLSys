import { useAppStateContext } from "@/context/appStateContext";
import { useGetDataContext } from "@/context/getDataContext";
import { useSessionContext } from "@/context/sessionContext";
import { KpiData } from "@/context/type/dataType";
import { useEffect } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const LossTimeChart = () => {
  const { getLastKpi, getAllKpiData } = useGetDataContext();
  const { kpiData, kpiId, userDataName } = useAppStateContext();
  const { fetchSession, session } = useSessionContext();

  useEffect(() => {
    fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  useEffect(() => {
    if (userDataName) {
      getLastKpi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDataName]);

  useEffect(() => {
    if (kpiId) {
      getAllKpiData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kpiId]);

  const chartData =
    kpiData?.map((item: KpiData) => ({
      time: item.date,
      LossTime: item.lossTimeDoc?.lossTimeRatio || 0,
    })) || [];

  const sortedChartData = chartData.slice().sort((a, b) => {
    const timeA = new Date(a.time).getTime();
    const timeB = new Date(b.time).getTime();
    return timeA - timeB;
  });

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <LineChart
        width={400}
        height={300}
        data={sortedChartData}
        margin={{
          top: 20,
          left: -30,
          right: 5,
          bottom: 10,
        }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 12 }}
          tickFormatter={(time) => {
            const date = new Date(time);
            const year = date.getFullYear().toString().slice(-2);
            const month = `0${date.getMonth() + 1}`.slice(-2);
            const day = `0${date.getDate()}`.slice(-2);
            return `${day}`;
          }}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Legend
          formatter={(value, entry) => "Loss Time"}
          wrapperStyle={{ fontSize: "12px" }}
        />
        <Line
          type="monotone"
          dataKey="LossTime"
          stroke="#f25738"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default LossTimeChart;
