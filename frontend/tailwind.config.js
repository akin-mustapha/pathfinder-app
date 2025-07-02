/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@uiw/react-md-editor/**/*.{js,jsx,ts,tsx}" // Add this line
  ],
  theme: {
    extend: {
      // 1. Centralize your color palette
      colors: {
        // --- Core Theme Colors ---
        'primary': 'var(--color-primary)', // e.g., #3b82f6 (blue-600)
        'primary-hover': 'var(--color-primary-hover)', // e.g., #2563eb (blue-700)
        'primary-focus': 'var(--color-primary-focus)', // e.g., #1d4ed8 (blue-800)
        
        'secondary': 'var(--color-secondary)', // e.g., #a855f7 (purple-500)
        
        // --- Background Colors ---
        'bg-base': 'var(--color-bg-base)', // e.g., #111827 (gray-900) - Main background
        'bg-surface': 'var(--color-bg-surface)', // e.g., #1f2937 (gray-800) - Cards, modals
        'bg-muted': 'var(--color-bg-muted)', // e.g., #374151 (gray-700) - Input fields, dividers
        
        // --- Text Colors ---
        'text-base': 'var(--color-text-base)', // e.g., #f9fafb (gray-50) - Main text
        'text-muted': 'var(--color-text-muted)', // e.g., #9ca3af (gray-400) - Secondary text
        'text-accent': 'var(--color-text-accent)', // e.g., #60a5fa (blue-400) - Links, highlights

        // --- Semantic Status Colors ---
        'status-success': 'var(--color-status-success)',
        'status-warning': 'var(--color-status-warning)',
        'status-danger': 'var(--color-status-danger)',
      },
      // 2. Centralize spacing, border radius, etc.
      borderRadius: {
        'base': '0.75rem', // 12px
        'lg': '1rem',     // 16px
        'xl': '1.5rem',   // 24px
      },
      // You can also extend fonts, shadows, etc. here
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // For the 'prose' theme
  ],
}