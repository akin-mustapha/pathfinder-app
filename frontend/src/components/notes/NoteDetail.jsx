import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // To get noteId from URL
import { Edit, Trash2, Tag, Link as LinkIcon, Loader, AlertTriangle, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown support
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'; // A good dark theme

// --- Reusable Child Components for this page ---

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6 m-4">
                <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
                <p className="text-gray-300 mb-6">{message}</p>
                <div className="flex justify-end gap-4">
                    <button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Cancel</button>
                    <button onClick={onConfirm} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">Confirm</button>
                </div>
            </div>
        </div>
    );
};

// --- Main Note Detail Page Component ---

const NoteDetail = () => {
    const { noteId } = useParams(); // Get the note ID from the URL, e.g., /notes/123
    const [note, setNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        const fetchNote = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // In a real app, you'd fetch the note data from your Notes Service
                // const response = await fetch(`/api/notes/${noteId}`);
                // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                // const data = await response.json();
                // setNote(data);

                // Using mock data until backend is ready
                const mockNote = {
                    id: noteId,
                    title: 'React Hooks Deep Dive',
                    content: `
# Understanding React Hooks

Hooks are functions that let you “hook into” React state and lifecycle features from function components.

## Key Hooks

1.  **\`useState\`**: For managing local component state.
2.  **\`useEffect\`**: For handling side effects (data fetching, subscriptions, etc.).
3.  **\`useContext\`**: To subscribe to React context without introducing nesting.

\`\`\`javascript
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  }, [count]); // Only re-run the effect if count changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`
                    `,
                    tags: ['React', 'Hooks', 'State Management'],
                    linkedTopics: [
                        { id: 't-2', title: 'State vs. Props' },
                        { id: 't-8', title: 'Create first functional component' }
                    ]
                };

                setTimeout(() => { // Simulate network delay
                    setNote(mockNote);
                    setIsLoading(false);
                }, 500);

            } catch (e) {
                setError(e.message);
                setIsLoading(false);
            }
        };

        fetchNote();
    }, [noteId]); // Re-fetch if the noteId in the URL changes

    const handleDelete = async () => {
        console.log(`Deleting note ${noteId}...`);
        // TODO: Implement API call to DELETE /api/notes/{noteId}
        // After successful deletion, navigate away (e.g., back to /notes)
        setIsDeleteModalOpen(false);
        alert('Note deleted (simulation)!');
        // navigate('/notes'); // would use useNavigate() from react-router-dom
    };

    const handleEdit = () => {
        console.log(`Editing note ${noteId}...`);
        // TODO: Implement navigation to an edit page, e.g., navigate(`/notes/${noteId}/edit`)
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-full"><Loader className="animate-spin text-blue-500" size={48} /></div>;
    }

    if (error) {
        return <div className="text-center text-red-400"><AlertTriangle size={48} className="mx-auto" /> Error loading note: {error}</div>;
    }
    
    if (!note) {
        return <div className="text-center text-gray-400">Note not found.</div>
    }

    return (
        <>
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
                title="Delete Note"
                message="Are you sure you want to permanently delete this note? This action cannot be undone."
            />
            <div className="bg-gray-800 p-6 md:p-8 rounded-2xl">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-3xl lg:text-4xl font-bold text-white">{note.title}</h1>
                    <div className="flex gap-2 shrink-0 ml-4">
                        <button onClick={handleEdit} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"><Edit size={20}/></button>
                        <button onClick={() => setIsDeleteModalOpen(true)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-full transition-colors"><Trash2 size={20}/></button>
                    </div>
                </div>

                {note.tags && note.tags.length > 0 && (
                    <div className="flex items-center flex-wrap gap-2 mb-6 text-gray-400">
                        <Tag size={16} className="shrink-0"/>
                        {note.tags.map(tag => (
                            <span key={tag} className="bg-gray-700 text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
                        ))}
                    </div>
                )}
                
                {note.linkedTopics && note.linkedTopics.length > 0 && (
                     <div className="flex items-center flex-wrap gap-2 mb-8 p-4 bg-gray-900/50 rounded-lg">
                        <LinkIcon size={16} className="text-gray-400 shrink-0"/>
                        <span className="text-sm font-semibold text-gray-400 mr-2">Linked Topics:</span>
                        {note.linkedTopics.map(topic => (
                             <Link key={topic.id} to={`/kanban`} className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-xs font-medium px-2.5 py-1 rounded-md transition-colors">
                                {topic.title}
                             </Link>
                        ))}
                    </div>
                )}
                
                <article className="prose prose-invert prose-lg max-w-none">
                    <ReactMarkdown
                        children={note.content}
                        remarkPlugins={[remarkGfm]}
                        components={{
                            code({node, inline, className, children, ...props}) {
                                const match = /language-(\w+)/.exec(className || '')
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        children={String(children).replace(/\n$/, '')}
                                        style={vscDarkPlus}
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    />
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    />
                </article>
            </div>
        </>
    );
};

export default NoteDetail;