import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const COLORS = [
  "#10b981", // Emerald
  "#0ea5e9", // Blue
  "#8b5cf6", // Purple
];

function GenderChart({ data }) {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const percentage = (
        (payload[0].value / data.reduce((sum, item) => sum + item.count, 0)) *
        100
      ).toFixed(1);

      return (
        <div className="bg-white border-2 border-emerald-300 rounded-lg p-3 shadow-lg">
          <p className="text-gray-900 font-semibold">{payload[0].name}</p>
          <p className="text-emerald-600 text-sm">
            {payload[0].value} patients ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border-2 border-emerald-200/40 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Patient Demographics
        </h2>
        <p className="text-gray-600 text-sm">
          Gender distribution of registered patients
        </p>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <defs>
            {COLORS.map((color, index) => (
              <linearGradient
                key={`gradient-${index}`}
                id={`gradient-${index}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                <stop offset="100%" stopColor={color} stopOpacity={0.6} />
              </linearGradient>
            ))}
          </defs>

          <Pie
            data={data}
            dataKey="count"
            nameKey="_id"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={40}
            paddingAngle={5}
            animationBegin={0}
            animationDuration={400}
            animationEasing="ease-out"
            label={({ _id, percent }) => `${_id} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#gradient-${index % COLORS.length})`}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />

          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value) => <span className="text-gray-700 font-medium">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GenderChart;
