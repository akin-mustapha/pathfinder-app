import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

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

export default SortableTopicCard;
