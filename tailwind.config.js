/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'sm': ['0.9375rem', { lineHeight: '1.5' }],    // 15px override
      },
      fontFamily: {
        // Merriweather for headlines and display text
        serif: ['var(--font-merriweather)', 'Merriweather', 'serif'],
        // Crimson Text for body text and content
        sans: ['var(--font-crimson)', 'Crimson Text', 'serif'],
        // Keep monospace for code elements if needed
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontWeight: {
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
      },
      lineHeight: {
        'none': '1',
        'tight': '1.1',
        'snug': '1.2',
        'normal': '1.3',
        'relaxed': '1.4',
        'loose': '1.5',
        'editorial': '1.6',     // Perfect for body text
        'display': '0.9',       // For large headlines
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
        'editorial': '0.015em',  // Subtle for editorial
        'headline': '-0.015em',  // Tighter for headlines
      },
    },
  },
  plugins: [],
}