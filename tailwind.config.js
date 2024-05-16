/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'headings': ['Iowan Old Style'],
        'charter': ['Charter']
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

