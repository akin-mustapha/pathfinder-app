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
        <aside className="layout-sidebar">
            <div className="flex items-center gap-3 mb-10">
                <Book className="text-primary" size={32} />
                <h1 className="text-2xl font-bold hidden lg:block">Pathfinder</h1>
            </div>
            <nav className="flex flex-col gap-3">
                {navItems.map(item => (
                    <NavLink key={item.name} to={item.path} end
                        className={({ isActive }) => `btn justify-start ${isActive ? 'btn-primary' : 'btn-secondary bg-transparent text-text-muted hover:bg-bg-muted hover:text-text-base'}`}
                    >
                        {item.icon}<span className="font-semibold hidden lg:block">{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};
export default Sidebar;