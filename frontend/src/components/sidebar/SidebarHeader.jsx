import React from 'react';
import { Book } from 'lucide-react';

const SidebarHeader = () => (
  <div className="sidebar-header">
    <Book className="sidebar-logo" size={32} />
    <h1 className="sidebar-title">Pathfinder</h1>
  </div>
);

export default SidebarHeader;
