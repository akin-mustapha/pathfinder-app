import React, { useState, useEffect } from 'react';
import { Loader2, Save } from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';

const NoteEditorView = ({ existingNote, onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => { setTitle(existingNote?.title || ''); setContent(existingNote?.content || ''); }, [existingNote]);
    const handleSave = async (e) => { e.preventDefault(); setIsSubmitting(true); await onSave({ title, content }); setIsSubmitting(false); };
    return (
        <form onSubmit={handleSave} className="p-2 md:p-6 h-full flex flex-col gap-4">
            <header className="flex justify-between items-center shrink-0">
                <h1 className="text-3xl font-bold">{existingNote ? 'Edit Note' : 'Create New Note'}</h1>
                <div className="flex items-center gap-4">
                    <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
                    <button type="submit" disabled={isSubmitting} className="btn-primary">
                        {isSubmitting ? <Loader2 className="animate-spin" /> : <Save />}<span>{isSubmitting ? 'Saving...' : 'Save'}</span>
                    </button>
                </div>
            </header>
            <input type="text" placeholder="Note Title" value={title} onChange={(e) => setTitle(e.target.value)} className="input-base text-2xl font-bold bg-transparent border-x-0 border-t-0 rounded-none !p-2" required />
            <div data-color-mode="dark" className="flex-grow min-h-0"><MDEditor value={content} onChange={setContent} height="100%" /></div>
        </form>
    );
};

export default NoteEditorView;
