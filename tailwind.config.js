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
        // Merriweather for headlines and display text
        serif: ['var(--font-merriweather)', 'Merriweather', 'serif'],
        // Crimson Text for body text and content
        sans: ['var(--font-crimson)', 'Crimson Text', 'serif'],
        // Keep monospace for code elements if needed
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Editorial Typography Scale
        'xs': ['0.75rem', { lineHeight: '1.4' }],       // 12px
        'sm': ['0.875rem', { lineHeight: '1.5' }],      // 14px
        'base': ['1.125rem', { lineHeight: '1.6' }],    // 18px - Editorial body
        'lg': ['1.25rem', { lineHeight: '1.5' }],       // 20px
        'xl': ['1.375rem', { lineHeight: '1.4' }],      // 22px
        '2xl': ['1.5rem', { lineHeight: '1.3' }],       // 24px
        '3xl': ['1.875rem', { lineHeight: '1.2' }],     // 30px
        '4xl': ['2.25rem', { lineHeight: '1.1' }],      // 36px
        '5xl': ['3rem', { lineHeight: '1.0' }],         // 48px
        '6xl': ['3.75rem', { lineHeight: '0.95' }],     // 60px
        '7xl': ['4.5rem', { lineHeight: '0.9' }],       // 72px
        '8xl': ['6rem', { lineHeight: '0.85' }],        // 96px
        '9xl': ['8rem', { lineHeight: '0.8' }],         // 128px
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