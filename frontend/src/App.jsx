import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';

// Import page components
import Dashboard from './pages/Dashboard';
import RoadmapsList from './pages/RoadmapsList';
import KanbanBoard from './pages/KanbanBoard';
import KnowledgeBasePage from './pages/KnowledgeBasePage'; 

export default function App() {
    return (
        <BrowserRouter>
            <div className="bg-gray-900 min-h-screen text-white font-sans flex p-4 gap-4">
                <Sidebar />
                <main className="flex-1 bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 lg:p-8 overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/roadmaps" element={<RoadmapsList />} />
                        <Route path="/kanban" element={<KanbanBoard />} />
                        <Route path="/kb" element={<KnowledgeBasePage />} />
                        <Route path="/kb/new" element={<KnowledgeBasePage />} />
                        <Route path="/kb/:articleId" element={<KnowledgeBasePage />} />
                        <Route path="/kb/:articleId/:action" element={<KnowledgeBasePage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}