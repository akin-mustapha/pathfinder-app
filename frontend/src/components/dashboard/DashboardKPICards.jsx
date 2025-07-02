import React from 'react';
import { Book, CheckCircle, FileText } from 'lucide-react';
import KPICard from './KPICard';

const DashboardKPICards = ({ kpis }) => (
  <div className="dashboard-kpi-grid">
    <KPICard 
      title="Total Roadmaps" 
      value={kpis.totalRoadmaps} 
      icon={<Book size={24} />} 
      color="var(--color-primary)"
      linkTo="/roadmaps"
    />
    <KPICard 
      title="Topics Completed" 
      value={kpis.topicsCompleted} 
      icon={<CheckCircle size={24} />} 
      color="var(--color-text-accent)"
      unit="topics"
      linkTo="/kanban"
    />
    <KPICard 
      title="Notes Created" 
      value={kpis.notesCreated} 
      icon={<FileText size={24} />} 
      color="var(--color-primary-focus)"
      linkTo="/kb"
    />
  </div>
);

export default DashboardKPICards;
