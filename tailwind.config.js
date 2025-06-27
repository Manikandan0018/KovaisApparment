/** @type {import('tailwindcss').Config} */
export default  {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
   safelist: [
    "block", "hidden", "flex", "lg:flex", "lg:hidden", "lg:items-center", "lg:w-auto",
    "flex-col", "flex-row", "space-y-2", "lg:space-x-6", "lg:space-y-0"
  ],  
  theme: {
    extend: {
     fontFamily: {
  playfair: ['"Playfair Display"', 'serif'],
},
    },
  },
  plugins: [],
};
