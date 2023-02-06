/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx}',
    './node_modules/flowbite-react/**/*.{js,jsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tw-elements/dist/plugin', 'flowbite/plugin')],
}
