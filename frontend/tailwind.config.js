/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      // 1. Centralize your color palette
      colors: {
        // --- Core Theme Colors ---
        'primary': '#3b82f6', // blue-600
        'primary-hover': '#2563eb', // blue-700
        'primary-focus': '#1d4ed8', // blue-800
        
        // --- Background Colors ---
        'bg-base': '#111827', // gray-900 - Main background
        'bg-surface': '#1f2937', // gray-800 - Cards, modals
        'bg-muted': '#374151', // gray-700 - Input fields, dividers
        
        // --- Text Colors ---
        'text-base': '#f9fafb', // gray-50 - Main text
        'text-muted': '#9ca3af', // gray-400 - Secondary text
        'text-accent': '#60a5fa', // blue-400 - Links, highlights

        // --- Semantic Status Colors ---
        'status-success': '#22c55e', // green-500
        'status-warning': '#f59e0b', // amber-500
        'status-danger': '#ef4444', // red-500
      },
      // 2. Centralize spacing, border radius, etc.
      borderRadius: {
        'base': '0.75rem', // 12px
        'lg': '1rem',     // 16px
        'xl': '1.5rem',   // 24px
      },
    },
  },
  plugins: [
    // require('@tailwindcss/typography'), // For the 'prose' theme - commented out for now
  ],
}