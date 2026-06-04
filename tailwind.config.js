/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: 'var(--cream)',
        ink: 'var(--ink)',
        sepia: 'var(--sepia)',
        warmblack: 'var(--warm-black)',
        paper: 'var(--paper)',
        rust: 'var(--rust)',
        mist: 'var(--mist)',
      },
      fontFamily: {
        display: ['var(--font-garamond)', 'serif'],
        body: ['NeueMontreal', 'var(--font-dm-sans)', 'sans-serif'],
      },
      borderRadius: {
        none: '0',
        sm: '2px',
      },
    },
  },
  plugins: [],
};
