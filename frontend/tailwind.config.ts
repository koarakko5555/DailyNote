import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography"; // ← ✅ 追加

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [typography], // ← ✅ 追加
};

export default config;