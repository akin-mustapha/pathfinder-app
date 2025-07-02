import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

const DashboardRoadmapProgress = ({ data }) => (
  <div className="dashboard-card">
    <h3 className="dashboard-card-title">Roadmap Progress</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-bg-muted)" />
        <XAxis type="number" stroke="var(--color-text-muted)" fontSize={12} domain={[0, 100]} unit="%"/>
        <YAxis type="category" dataKey="title" stroke="var(--color-text-muted)" fontSize={12} width={80} />
        <Tooltip contentStyle={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-bg-muted)', borderRadius: 'var(--border-radius-base)' }} cursor={{ fill: 'rgba(var(--color-primary-rgb), 0.1)' }}/>
        <Bar dataKey="progress" fill="var(--color-primary)" name="Progress" radius={[0, 4, 4, 0]} barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default DashboardRoadmapProgress;
