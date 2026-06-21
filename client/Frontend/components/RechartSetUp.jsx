import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

// Premium color palette for charts
const COLORS = [
  "#6366f1", // Indigo
  "#8b5cf6", // Purple
  "#3b82f6", // Blue
  "#10b981", // Emerald
  "#ec4899", // Pink
  "#f59e0b"  // Amber
];

export default function RechartsSetUp({ chart }) {
  if (!chart) return null;

  const renderChart = () => {
    switch (chart.type) {
      case "bar": {
        // Ensure data exists and is valid
        const data = chart.data || [];
        return (
          <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="label" 
                  stroke="#6b7280" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#6b7280" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.95)", 
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
                  }}
                  labelStyle={{ fontWeight: "bold", color: "#111827" }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      }

      case "line": {
        const data = chart.data || [];
        return (
          <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="x" 
                  stroke="#6b7280" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#6b7280" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.95)", 
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
                  }}
                  labelStyle={{ fontWeight: "bold", color: "#111827" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="y" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  activeDot={{ r: 6 }} 
                  dot={{ stroke: "#3b82f6", strokeWidth: 2, r: 4, fill: "#fff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      }

      case "pie": {
        const data = chart.data || [];
        return (
          <div className="w-full h-[260px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="percentage"
                  nameKey="label"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.95)", 
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  formatter={(value) => <span className="text-xs text-gray-600 font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      }

      case "flowchart": {
        const nodes = chart.nodes || [];
        const connections = chart.connections || [];
        
        // Find children nodes for connections to render them sequentially if possible
        return (
          <div className="py-2 space-y-4">
            <div className="flex flex-wrap items-center gap-4 justify-start p-4 bg-gray-50/50 rounded-xl border border-gray-100">
              {nodes.map((node, i) => {
                const hasNext = connections.some(conn => conn.from === node.id);
                return (
                  <div key={node.id} className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-100 rounded-xl text-sm font-semibold text-indigo-700 shadow-sm">
                      {node.text}
                    </div>
                    {hasNext && (
                      <span className="text-gray-400 font-bold animate-pulse">➔</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      default:
        return <p className="text-sm text-gray-500">Unsupported chart type</p>;
    }
  };

  return (
    <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm space-y-4">
      <div>
        <h4 className="font-bold text-gray-800 text-lg">{chart.title || "Visualization"}</h4>
        {chart.description && (
          <p className="text-gray-500 text-xs mt-1">{chart.description}</p>
        )}
      </div>
      <div className="pt-2">
        {renderChart()}
      </div>
    </div>
  );
}
