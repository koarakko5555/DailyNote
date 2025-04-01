"use client";

import { useEffect, useState } from "react";
import { isSameDay, isSameMonth, parseISO, format } from "date-fns";
import Link from "next/link";

interface Diary {
  id: number;
  title: string;
  date: string;
}

interface CalendarCellProps {
  day: Date;
  currentMonth: Date;
  diaries: Diary[];
}

export default function CalendarCell({ day, currentMonth, diaries }: CalendarCellProps) {
  const [isCurrentMonth, setIsCurrentMonth] = useState(false);
  const [dayText, setDayText] = useState("");

  useEffect(() => {
    setIsCurrentMonth(isSameMonth(day, currentMonth));
    setDayText(format(day, "d"));
  }, [day, currentMonth]);

  const dayDiaries = diaries.filter((d) => isSameDay(parseISO(d.date), day));

  return (
      <div
        className={`border p-2 min-h-[100px] rounded-lg ${
          isCurrentMonth
            ? "bg-red-500 text-white text-2xl font-bold"
            : "bg-gray-100 text-gray-400"
        }`}
      >
      <div className="mt-4 ml-4">{dayText}</div>
      <ul className="mt-1 space-y-1 max-h-[80px] overflow-y-auto text-sm">
        {dayDiaries.map((diary) => (
          <li key={diary.id}>
            <Link
              href={`/${diary.id}`}
              className="text-blue-600 hover:underline block truncate"
            >
              {diary.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}