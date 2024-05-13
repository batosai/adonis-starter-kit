/** @type {import('tailwindcss').Config} */

import edgeComponent from '@jrmc/edge-components/tailwind.config'

export default {
  content: ['./resources/views/**/*.edge', ...edgeComponent.content],
  theme: {
    extend: {},
  },
  plugins: [...edgeComponent.plugins],
}

