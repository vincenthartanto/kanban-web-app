/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundPosition: {
        "right-2": "95% 50%",
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "1400px",
      },
      colors: {
        mainRed: "#EA5555",
        mainPurple: "#635FC7",
        mainPurpleHover: "#A8A4FF",
        mediumGrey: "#828FA3",
        darkGrey: "#2B2C37",
        veryDarkGrey: "#20212C",
        lightGrey: "#F4F7FD",
        lightBlue: "#49C4E5",
        lightGreen: "#67E2AE",
      },
    },
  },
  plugins: [],
};
