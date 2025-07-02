import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import './index.css'; // Ensure global styles are applied

// Import page components
import './components/knowledgeBase/NoteListPanel'; // Ensure this component is imported for its styles
import './components/layout/AppLayout'; // Ensure this component is imported for its styles
// Import page components
import Dashboard from './pages/Dashboard';
import RoadmapsList from './pages/RoadmapsList';
import KanbanBoard from './pages/KanbanBoard';
import KnowledgeBasePage from './pages/KnowledgeBasePage'; 

export default function App() {
    return (
        <BrowserRouter>
            <AppLayout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/roadmaps" element={<RoadmapsList />} />
                    <Route path="/kanban" element={<KanbanBoard />} />
                    <Route path="/kb" element={<KnowledgeBasePage />} />
                    <Route path="/kb/new" element={<KnowledgeBasePage />} />
                    <Route path="/kb/:articleId" element={<KnowledgeBasePage />} />
                    <Route path="/kb/:articleId/:action" element={<KnowledgeBasePage />} />
                </Routes>
            </AppLayout>
        </BrowserRouter>
    );
}