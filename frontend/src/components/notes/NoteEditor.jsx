import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // For getting noteId and navigating
import MDEditor from '@uiw/react-md-editor'; // The rich Markdown editor
import { X, Tag, Loader, Save } from 'lucide-react';

// --- Reusable Child Component for Tag Input ---

const TagInput = ({ tags, setTags }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = inputValue.trim();
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
            }
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
            <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-700 border border-gray-600 rounded-lg">
                <Tag size={16} className="text-gray-400 shrink-0 ml-1" />
                {tags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-1 bg-blue-600/50 text-blue-200 text-sm font-medium px-2 py-1 rounded">
                        <span>{tag}</span>
                        <button type="button" onClick={() => removeTag(tag)} className="hover:text-white">
                            <X size={14} />
                        </button>
                    </div>
                ))}
                <input
                    type="text"
                    id="tags"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-grow bg-transparent text-white focus:outline-none p-1"
                    placeholder="Add a tag and press Enter..."
                />
            </div>
        </div>
    );
};


// --- Main Note Editor Page Component ---

const NoteEditor = () => {
    const { noteId } = useParams(); // Will be defined if editing: /notes/123/edit
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('**Hello world!!!**'); // Default markdown content
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const isEditing = Boolean(noteId);

    // Fetch existing note data if we are in edit mode
    useEffect(() => {
        if (isEditing) {
            setIsLoading(true);
            const fetchNote = async () => {
                try {
                    // const response = await fetch(`/api/notes/${noteId}`);
                    // if (!response.ok) throw new Error('Note not found');
                    // const data = await response.json();
                    
                    // Mocking fetch for demonstration
                    const mockNote = {
                        id: noteId,
                        title: 'React Hooks Deep Dive',
                        content: '# Understanding React Hooks\n\n- `useState`\n- `useEffect`',
                        tags: ['React', 'Hooks'],
                    };
                    setTimeout(() => { // Simulate network delay
                        setTitle(mockNote.title);
                        setContent(mockNote.content);
                        setTags(mockNote.tags);
                        setIsLoading(false);
                    }, 500);

                } catch (e) {
                    setError(e.message);
                    setIsLoading(false);
                }
            };
            fetchNote();
        }
    }, [noteId, isEditing]);

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        
        const noteData = { title, content, tags };
        const url = isEditing ? `/api/notes/${noteId}` : '/api/notes';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            // const response = await fetch(url, {
            //     method: method,
            //     headers: { 'Content-Type': 'application/json', /* 'Authorization': '...' */ },
            //     body: JSON.stringify(noteData),
            // });
            // if (!response.ok) throw new Error('Failed to save note');
            // const savedNote = await response.json();
            
            // Mocking API call success
            console.log('Saving note...', noteData);
            await new Promise(res => setTimeout(res, 1000));
            const savedNoteId = isEditing ? noteId : 'new-note-id-5678';
            
            // Navigate to the note's detail page after saving
            navigate(`/notes/${savedNoteId}`);

        } catch (e) {
            setError(e.message);
            setIsSubmitting(false);
        }
    };
    
    if (isLoading) {
        return <div className="flex justify-center items-center h-full"><Loader className="animate-spin text-blue-500" size={48} /></div>;
    }

    return (
        <form onSubmit={handleSave} className="bg-gray-800 p-6 md:p-8 rounded-2xl h-full flex flex-col">
            <header className="flex justify-between items-center mb-6 shrink-0">
                <h1 className="text-3xl font-bold text-white">{isEditing ? 'Edit Note' : 'Create New Note'}</h1>
                <div className="flex items-center gap-4">
                     <button type="button" onClick={() => navigate(isEditing ? `/notes/${noteId}` : '/notes')} className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:bg-blue-800 disabled:cursor-not-allowed">
                        {isSubmitting ? <Loader className="animate-spin" size={20} /> : <Save size={20} />}
                        {isSubmitting ? 'Saving...' : 'Save Note'}
                    </button>
                </div>
            </header>
            
            {error && <div className="bg-red-900/50 text-red-300 p-3 rounded-lg mb-4">{error}</div>}

            <div className="space-y-6 flex-grow flex flex-col min-h-0">
                <div className="shrink-0">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                    <input
                        type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                
                <div data-color-mode="dark" className="flex-grow flex flex-col min-h-0">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Content</label>
                    <MDEditor
                        value={content}
                        onChange={setContent}
                        height="100%"
                        className="flex-grow"
                    />
                </div>

                <div className="shrink-0">
                    <TagInput tags={tags} setTags={setTags} />
                </div>
            </div>
        </form>
    );
};

export default NoteEditor;