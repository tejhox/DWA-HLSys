import { useAllStateContext } from "@/context/allStateContext";
import { KpiData } from "@/context/type/dataType";
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

const ProductivityChart = (props: any) => {
  const { kpiData } = useAllStateContext();

  const chartData =
    kpiData?.map((item: KpiData) => ({
      time: item.date,
      Productivity: item.productivityDoc?.unitPerManHrAct || 0,
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
          bottom: props.marBot,
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
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Line
          type="monotone"
          dataKey="Productivity"
          stroke="#8884d8"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default ProductivityChart;
