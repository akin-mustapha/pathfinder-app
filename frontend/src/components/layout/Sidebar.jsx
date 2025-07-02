import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, Trello, Notebook, Book } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={24} /> },
        { name: 'Roadmaps', path: '/roadmaps', icon: <Map size={24} /> },
        { name: 'Kanban Board', path: '/kanban', icon: <Trello size={24} /> },
        { name: 'Knowledge Base', path: '/kb', icon: <Notebook size={24} /> },
    ];
    return (
        <aside className="sidebar-container">
            <div className="sidebar-header">
                <Book className="sidebar-logo" size={32} />
                <h1 className="sidebar-title">Pathfinder</h1>
            </div>
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
        </aside>
    );
};
export default Sidebar;