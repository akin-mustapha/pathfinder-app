export default {
  plugins: {
    // Use the new package name as the key
    '@tailwindcss/postcss': {}, 
    autoprefixer: {},
  },
}

// // This file should be DELETED.
// // The @tailwindcss/vite plugin in your vite.config.js handles all PostCSS
// // configuration automatically, making this file redundant and causing conflicts.
// // By removing it, you allow the Vite plugin to work correctly.

// export default {
//   plugins: {},
// };