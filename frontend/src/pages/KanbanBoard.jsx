import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Loader2, AlertTriangle } from 'lucide-react';

// --- Reusable Child Components for the Kanban Board ---

const SortableTopicCard = ({ id, title }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} className="kanban-card">
            <p className="font-medium text-sm flex-grow pr-2">{title}</p>
            <div {...listeners} className="kanban-card-handle">
                <GripVertical size={16} />
            </div>
        </div>
    );
};

const KanbanColumn = ({ id, title, topics, statusColor }) => {
    return (
        <div className="kanban-column">
            <div className={`kanban-column-header ${statusColor}`}>
                <h3>{title}</h3>
                <span className="kanban-column-counter">
                    {topics.length}
                </span>
            </div>
            <div className="kanban-column-body">
                <SortableContext items={topics.map(t => t.id)} strategy={verticalListSortingStrategy}>
                    {topics.map(topic => (
                        <SortableTopicCard key={topic.id} id={topic.id} title={topic.title} />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
};

// --- Main Kanban Board Page Component ---

const KanbanBoard = () => {
    const [columns, setColumns] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBoardData = async () => {
            setIsLoading(true);
            try {
                // Using mock data until backend is ready
                const mockData = {
                    'Not Started': [{ id: 't-1', title: 'Learn about Virtual DOM' }, { id: 't-2', title: 'State vs. Props' }],
                    'In Progress': [{ id: 't-4', title: 'Build a simple todo app' }],
                    'Completed': [{ id: 't-6', title: 'Setup React environment' }, { id: 't-7', title: 'What is JSX?' }],
                };
                setTimeout(() => {
                    setColumns(mockData);
                    setIsLoading(false);
                }, 1000);
            } catch (e) {
                setError(e.message);
                setIsLoading(false);
            }
        };
        fetchBoardData();
    }, []);

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: { distance: 8 },
    }));

    const findContainer = (id) => {
        if (id in columns) return id;
        return Object.keys(columns).find(key => columns[key].some(item => item.id === id));
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over) return;
        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over.id);
        if (!activeContainer || !overContainer || activeContainer === overContainer) return;
        
        // Optimistic UI Update
        setColumns((prev) => {
            const activeItems = prev[activeContainer];
            const overItems = prev[overContainer];
            const activeIndex = activeItems.findIndex((item) => item.id === active.id);
            const [movedItem] = activeItems.splice(activeIndex, 1);
            
            // This logic correctly adds the item to the new column
            const overIndex = over.id in prev ? overItems.length : overItems.findIndex(item => item.id === over.id);
            overItems.splice(overIndex, 0, movedItem);

            return { ...prev, [activeContainer]: activeItems, [overContainer]: overItems };
        });
        
        // Backend Sync
        try {
            console.log(`SYNCING: Move topic ${active.id} to status '${overContainer}'`);
            // await fetch(`/api/topics/${active.id}/status`, { method: 'PATCH', ... });
        } catch (error) {
            console.error("Failed to sync with backend:", error);
            // TODO: Revert UI state on failure
        }
    };
    
    // Map status names to our semantic theme BORDER colors.
    // These Tailwind classes use the CSS variables defined in :root.
    const columnStyles = {
        'Not Started': { color: 'border-status-danger' },
        'In Progress': { color: 'border-status-warning' },
        'Completed': { color: 'border-status-success' },
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-full"><Loader2 className="w-12 h-12 text-primary animate-spin" /></div>;
    }

    if (error) {
        return (
            <div className="card items-center justify-center flex flex-col bg-status-danger/20 text-status-danger">
                <AlertTriangle size={48} className="mb-4" />
                <p>Error loading board: {error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <header className="mb-8 shrink-0">
                <h1 className="text-4xl font-bold">Kanban Board</h1>
                <p className="text-text-muted mt-1">Track your topic progress visually. Drag and drop to update status.</p>
            </header>
            <div className="kanban-board-grid">
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    {Object.keys(columns).map(columnId => (
                        <KanbanColumn
                            key={columnId}
                            id={columnId}
                            title={columnId}
                            topics={columns[columnId]}
                            statusColor={columnStyles[columnId]?.color || 'border-transparent'}
                        />
                    ))}
                </DndContext>
            </div>
        </div>
    );
};

export default KanbanBoard;