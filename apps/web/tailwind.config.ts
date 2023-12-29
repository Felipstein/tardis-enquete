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
      backgroundImage: {
        'selected-gradient-progress-bar': 'linear-gradient(to bottom right, #80B7FB, #5EEAD4)',
        'selected-gradient-progress-background': 'linear-gradient(to bottom right, #264264, #115E59)',
        'selected-gradient-background': 'linear-gradient(to right, #4674B7, #063131)',
      },
      boxShadow: {
        selected: '0 4px 6px rgba(57, 165, 152, 0.25)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};

export default config;
