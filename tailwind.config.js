/** @type {import('tailwindcss').Config} */
import edgeComponent from '@jrmc/edge-components/tailwind.config'

export default {
  content: ['./src/**/resources/**/*.(edge|js)', ...edgeComponent.content],
  theme: {
    extend: {},
  },
  plugins: [...edgeComponent.plugins],
}
