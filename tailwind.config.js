/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "main": "#D0ECE7",       // Soft Mint Green (main background)
        "subMain": "#4CAF50",    // Fern Green (sidebar, navbar, form, button)
        "dry": "#81C784",        // Light Olive Green (hover background)
        "star": "#66BB6A",       // Vibrant Green (active background)
        "text": "#1B5E20",       // Deep Pine Green (text)
        "border": "#A9B7B2",     // Muted Gray-Green (border)
        "dryGray": "#F0F4C3",     // Soft Lemon Lime (links)
        "navbar": "#011c13" ,
        "hover": "#013021"
      },
    },
  },
  plugins: [],
}

