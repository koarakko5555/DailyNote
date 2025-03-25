"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  format,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import ja from "date-fns/locale/ja";

type Diary = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export default function Home() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date()); // ← 状態を管理

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

  const title = format(currentMonth, "yyyy年M月", { locale: ja });
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const formattedDate = format(day, "yyyy-MM-dd");
      const dayDiaries = diaries.filter((d) =>
        isSameDay(parseISO(d.date), day)
      );

      days.push(
        <div
          key={day.toString()}
          className={`border p-2 min-h-[100px] text-sm ${
            isSameMonth(day, currentMonth)
              ? "bg-white"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          <div className="font-semibold">{format(day, "d")}</div>
          <ul className="mt-1 space-y-1">
            {dayDiaries.map((diary) => (
              <li key={diary.id}>
                <Link
                  href={`/${diary.id}`}
                  className="text-blue-600 hover:underline text-sm block truncate"
                >
                  {diary.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );

      day = addDays(day, 1);
    }

    rows.push(
      <div key={day.toString()} className="grid grid-cols-7 gap-2">
        {days}
      </div>
    );
    days = [];
  }

  return (
    <main className="bg-[#eef4ed] text-gray-900 min-h-screen">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevMonth} className="text-2xl">
            ←
          </button>
          <h1 className="text-3xl font-bold">{title}</h1>
          <button onClick={handleNextMonth} className="text-2xl">
            →
          </button>
        </div>

        <Link href="/new" className="inline-block mb-4 text-purple-700 underline">
          ＋ 新しく日記を書く
        </Link>

        <div className="grid grid-cols-7 mb-2 font-semibold text-center text-gray-700">
          {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="space-y-2">{rows}</div>
      </div>
    </main>
  );
}