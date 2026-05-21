/** @type {import('tailwindcss').Config} */
// Build config for the Bloody Actor portfolio.
// Generates assets/style.css from the utility classes used in index.html,
// replacing the runtime Tailwind CDN. Rebuild command is in README.md.
module.exports = {
  content: ['./index.html'],
  // Classes toggled by JS (mobile menu) — kept so they're never purged.
  safelist: ['hidden', 'flex'],
  theme: { extend: {} },
  plugins: [],
};
