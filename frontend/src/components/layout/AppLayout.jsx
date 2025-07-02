import React from 'react';
import Sidebar from './Sidebar';

// AppLayout: Provides the main shell for the app (sidebar + main content)
const AppLayout = ({ children }) => (
    <div className="flex min-h-screen bg-gray-100">
        <div className=".test-tailwind-component">
            Test Card Styling
        </div>
        <button className="btn-primary">Test Button</button>
        <Sidebar />
        <main className="flex-1 p-8">
            <div className="bg-white rounded shadow p-6">
                {children}
            </div>
        </main>
    </div>
);

export default AppLayout;
