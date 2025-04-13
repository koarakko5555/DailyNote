"use client";
import { useEffect, useState } from "react";
import Calendar from "./components/Calendar";
import Link from "next/link";

type Diary = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export default function Home() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const apiUrl =
    typeof window === "undefined"
      ? "http://dailynote_backend:3001/api/v1"
      : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api/v1";

  useEffect(() => {
    fetch(`${apiUrl}/diaries`)
      .then((res) => res.json())
      .then((data) => setDiaries(data))
      .catch((err) => console.error("APIエラー:", err));
  }, []);

  return (
    <main className="bg-[#eef4ed] text-gray-900 min-h-screen">
      <div className="max-w-5xl mx-auto p-6">
        <Calendar
          currentMonth={currentMonth}
          diaries={diaries}
          onMonthChange={(date) => setCurrentMonth(date)}
        />

        {/* 📔 日記パネル */}
        <div className="mt-10 bg-[#f0fdf4] p-4 rounded-xl shadow-md flex justify-between items-center max-w-md mx-auto">
          <div className="text-lg font-semibold text-[#355e3b] flex items-center gap-2">
            📔 <span>日記</span>
          </div>
          <Link
            href="/new"
            className="bg-green-300 hover:bg-green-400 text-white text-xl px-3 py-1 rounded-full transition"
            aria-label="新規作成"
          >
            ➕
          </Link>
        </div>
      </div>
    </main>
  );
}