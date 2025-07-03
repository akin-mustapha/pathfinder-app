import React from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

const DashboardRecentActivity = ({ data }) => (
  <div className="dashboard-card">
    <h3 className="dashboard-card-title">Recent Activity (Last 7 Days)</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-bg-muted)" />
        <XAxis dataKey="date" stroke="var(--color-text-muted)" fontSize={12} />
        <YAxis stroke="var(--color-text-muted)" fontSize={12} />
        <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-bg-muted)', borderRadius: 'var(--border-radius-base)' }} />
        <Legend wrapperStyle={{fontSize: "14px"}} />
        <Line type="monotone" dataKey="topics" name="Topics Completed" stroke="var(--color-text-accent)" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default DashboardRecentActivity;
