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
      </div>
    </main>
  );
}