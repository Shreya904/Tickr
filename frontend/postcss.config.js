/** @type {import('postcss').Config} */
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {}, // ✅ instead of 'tailwindcss'
    autoprefixer: {},
  },
};
