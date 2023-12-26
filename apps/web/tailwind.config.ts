/* eslint-disable global-require */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ECEEF8',
          100: '#C4CAE5',
          300: '#9298B2',
          500: '#636981',
          700: '#373E54',
          800: '#1E293B',
          900: '#152029',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};

export default config;
