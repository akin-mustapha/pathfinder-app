import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableTopicCard from './SortableTopicCard';

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

export default KanbanColumn;
