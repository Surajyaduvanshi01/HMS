import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
} from "recharts";

function RevenueChart({ data }) {
  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthMap = new Map();
  data.forEach((item) => {
    const key = `${item._id.year}-${String(item._id.month).padStart(2, "0")}`;
    monthMap.set(key, item.revenue);
  });

  const keys = Array.from(monthMap.keys()).sort();
  const formatted = keys.map((key) => {
    const [year, monthStr] = key.split("-");
    const monthIndex = Number(monthStr);
    return {
      month: `${months[monthIndex]} ${year}`,
      revenue: monthMap.get(key) ?? 0,
    };
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border-2 border-emerald-300 rounded-lg p-3 shadow-lg">
          <p className="text-gray-900 font-semibold">
            ₹{payload[0].value?.toLocaleString()}
          </p>
          <p className="text-emerald-600 text-sm">{payload[0].payload.month}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border-2 border-emerald-200/40 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Revenue Analytics
        </h2>
        <p className="text-gray-600 text-sm">
          Monthly revenue trends and performance metrics
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={formatted}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            stroke="#9ca3af"
            style={{ fontSize: "12px", fontWeight: 500 }}
          />

          <YAxis
            stroke="#9ca3af"
            style={{ fontSize: "12px", fontWeight: 500 }}
          />

          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: "#10b981", r: 5, strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 7 }}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RevenueChart;
