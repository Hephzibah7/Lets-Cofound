/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        // darkBlue: '#1a202c', // Dark blue background for dark mode
        lightGray: '#D5D0D0', // Light gray background for light mode
        lightPurple: '#C00CE3',
        darkPurple: '#9805AD',
        white: '#ffffff', // White color for text in dark mode
        black: '#000000', // Black color for text in light mode
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'], // Enable dark mode variant for background color
      textColor: ['dark'], // Enable dark mode variant for text color
    },
  },
  plugins: [],
  darkMode: 'class', // This will enable dark mode based on a class
};
