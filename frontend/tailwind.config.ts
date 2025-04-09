import typography from "@tailwindcss/typography"; // ← ✅ 追加

const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [ // ← ここは content の外！
    "bg-red-500",
    "text-white",
    "text-2xl",
    "font-bold",
    "bg-gray-100",
    "text-gray-400",
  ],
  theme: {
    extend: {},
  },
  plugins: [typography], // ← ✅ 追加
};

export default config;