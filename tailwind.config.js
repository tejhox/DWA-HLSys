/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        protest: ["Protest Guerrilla"],
        inconsolata: ["Inconsolata"],
        bitter: ["Bitter"],
        rajdhani: ["Rajdhani"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "synthwave",
      "fantasy",
      "business",
      "night",
      "retro",
      "wireframe",
      "acid",
      "nord",
      "winter",
      "corporate",
      "aqua",
      "garden",
      "lofi",
      "pastel",
      "cmyk",
    ],
  },
};
