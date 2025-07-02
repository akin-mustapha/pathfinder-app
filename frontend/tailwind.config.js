import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3b82f6',
        'primary-hover': '#2563eb',
        'primary-focus': '#1d4ed8',
        'secondary': '#a855f7',
        'bg-base': '#111827',
        'bg-surface': '#1f2937',
        'bg-muted': '#374151',
        'text-base': '#f9fafb',
        'text-muted': '#9ca3af',
        'text-accent': '#60a5fa',
        'status-success': '#22c55e',
        'status-warning': '#f59e0b',
        'status-danger': '#ef4444'
      },
      borderRadius: {
        'base': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
      },
    },
  },
  plugins: [
    typography,
  ],
}