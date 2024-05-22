/** @type {import('tailwindcss').Config} */
import edgeComponent from '@jrmc/edge-components/tailwind.config'

export default {
  content: ['./src/**/resources/**/*.edge', ...edgeComponent.content],
  theme: {
    extend: {},
  },
  plugins: [...edgeComponent.plugins],
}
