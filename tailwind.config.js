/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['IBM Plex Mono', 'monospace'],
        // Override default sans and serif to use IBM Plex Mono for a cohesive monospace aesthetic
        sans: ['IBM Plex Mono', 'monospace'],
        serif: ['IBM Plex Mono', 'monospace'],
      },
      fontWeight: {
        'normal': '400',
        'bold': '700',
      },
      fontStyle: {
        'normal': 'normal',
        'italic': 'italic',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
        'ultra-wide': '0.2em',
      },
    },
  },
  plugins: [],
}