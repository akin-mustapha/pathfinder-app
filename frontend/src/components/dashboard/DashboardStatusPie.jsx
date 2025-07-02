import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const DashboardStatusPie = ({ data }) => (
  <div className="dashboard-card">
    <h3 className="dashboard-card-title">Topic Status Breakdown</h3>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" nameKey="name">
          {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />)}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-bg-muted)', borderRadius: 'var(--border-radius-base)' }} itemStyle={{ color: 'var(--color-text-base)' }} />
        <Legend wrapperStyle={{fontSize: "14px"}}/>
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default DashboardStatusPie;
