/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fb5431",
        secondary: "#D0011B",
        primaryText: "",
        subText: "#636363",
        avtiveText: "#D0011B",
        secondaryAvtiveText: '#EE4D2D',
        blueText: "#0055AA"
      },
      fontFamily: {
        helve: ["var(--font-helvetica)"],
        roboto: ["Urbanist", 'sans-serif'],
      },
      screens: {
        mobile: '375px',      // mobile
        tablet: '600px',      // Tablet
        laptop: '1024px',     // Laptop
        desktop: '1440px',    // Desktop
      },
    },
  },
  plugins: [],
};
