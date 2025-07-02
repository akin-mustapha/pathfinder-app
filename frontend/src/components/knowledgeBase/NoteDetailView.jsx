import React from 'react';
import { Edit, Trash2, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const NoteDetailView = ({ note, onEdit, onDelete }) => (
    <div className="p-2 md:p-6">
        <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl lg:text-4xl font-bold">{note.title}</h1>
            <div className="flex gap-2 shrink-0 ml-4">
                <button onClick={() => onEdit(note.id)} className="icon-button-default"><Edit size={20}/></button>
                <button onClick={() => onDelete(note.id)} className="icon-button-danger"><Trash2 size={20}/></button>
            </div>
        </div>
        {note.tags?.length > 0 && (
            <div className="flex items-center flex-wrap gap-2 mb-6 text-text-muted"><Tag size={16} className="shrink-0"/>
                {note.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
        )}
        <article className="prose prose-invert prose-lg max-w-none"><ReactMarkdown children={note.content} remarkPlugins={[remarkGfm]} /></article>
    </div>
);

export default NoteDetailView;
