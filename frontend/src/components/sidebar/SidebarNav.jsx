import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, Trello, Notebook } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={24} /> },
  { name: 'Roadmaps', path: '/roadmaps', icon: <Map size={24} /> },
  { name: 'Kanban Board', path: '/kanban', icon: <Trello size={24} /> },
  { name: 'Knowledge Base', path: '/kb', icon: <Notebook size={24} /> },
];

const SidebarNav = () => (
  <nav className="sidebar-nav">
    {navItems.map(item => (
      <NavLink
        key={item.name}
        to={item.path}
        end
        className={({ isActive }) =>
          `sidebar-link ${isActive ? 'sidebar-link--active' : 'sidebar-link--inactive'}`
        }
      >
        {item.icon}
        <span className="hidden lg:block">{item.name}</span>
      </NavLink>
    ))}
  </nav>
);

export default SidebarNav;
