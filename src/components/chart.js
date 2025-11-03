import React from "react"
import {
    LineChart,
    BarChart,
    PieChart,
    Cell,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Line,
    Pie,
} from "recharts";
import "./chart.css";

export default function Chart({ data }) {
    return(
        <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="name" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip/>
                    <Line type="monotone" dataKey="tasks" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export function TaskDistributionChart({ data }) {
    return (
        <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
                <BarChart data={data}>
                    <XAxis dataKey="category" stroke="#ccc" />
                    <YAxis stroke="#ccc" />
                    <Tooltip contentStyle={{ backgroundColor: '#0f1623', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', color: '#e6eaf2' }} />
                    <Bar dataKey="tasks" fill="#6d82f3" radius={[10, 10, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export function TaskPriorityPie({ data }) {
  const PRIORITY_COLORS = {
    High: "#f04747",
    Medium: "#faa61a",
    Low: "#43b581",
  };

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="priority"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={PRIORITY_COLORS[entry.priority] || "#8884d8"}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
