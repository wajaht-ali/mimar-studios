/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4f46e5",
        light: '#fff', // White color
        lightShaded: '#f3f3f3', // White color
        dark: '#333', // Dark color
        darkShaded: '#1a1a1a', // Dark color
        danger: "#ef4444",
        borderGray: "#9ca3af",
        radius: "8px 0px 8px 0px"
      },
    },
  },
  plugins: [],
}

