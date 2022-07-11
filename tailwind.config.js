/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#1A3D82",
        pageBgColor: "#FCFCFC",
        dividerColor: "#E1E4E8",
        inputColor: "#F1F1F2",
        textSelectColor: "#6E6D7A",
        textColor: "#0D0C22",
        btnLightColor: "#F9F9FB",
      },
      maxWidth: {
        "8xl": "120rem",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
