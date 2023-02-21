/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    require("flowbite/plugin"),
  ],
};
