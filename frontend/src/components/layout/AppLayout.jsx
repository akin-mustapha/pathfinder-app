import React from 'react';
import Sidebar from './Sidebar';

// AppLayout: Provides the main shell for the app (sidebar + main content)
const AppLayout = ({ children }) => (
    <div className="layout-container">
        <Sidebar />
        <main className="layout-main">
            <div className="layout-main-content">
                {children}
            </div>
        </main>
    </div>
);

export default AppLayout;
