const colors = {
  ebeef9: "#ebeef9",
  468499: "#468499",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],

  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};
