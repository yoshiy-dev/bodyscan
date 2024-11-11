import { type Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#ffedd5',
          secondary: '#f59e0b',
          accent: '#cf6ad8',
          neutral: '#141a1f',
          info: '#758ce6',
          success: '#14b36b',
          warning: '#e28408',
          error: '#f15560',
        },
      },
    ],
  },
} satisfies Config;
