import React from 'react';
import { Link } from 'react-router-dom';

const KPICard = ({ title, value, icon, color, linkTo, unit }) => {
  const CardContent = (
    <div className="kpi-card-content">
      <div className="kpi-card-icon" style={{ backgroundColor: color }}>{icon}</div>
      <div>
        <p className="kpi-card-title">{title}</p>
        <p className="kpi-card-value">
          {value}
          {unit && <span className="kpi-card-unit">{unit}</span>}
        </p>
      </div>
    </div>
  );
  const cardClasses = `kpi-card ${linkTo ? 'kpi-card--linkable' : ''}`;
  return linkTo ? <Link to={linkTo} className={cardClasses}>{CardContent}</Link> : <div className={cardClasses}>{CardContent}</div>;
};
export default KPICard;