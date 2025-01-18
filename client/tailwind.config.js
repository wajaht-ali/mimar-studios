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
        light: '#fff',
        lightShaded: '#f3f3f3',
        dark: '#333', 
        darkShaded: '#1a1a1a',
        danger: "#ef4444",
        borderGray: "#9ca3af",
        radius: "8px 0px 8px 0px"
      },
    },
  },
  plugins: [],
}

