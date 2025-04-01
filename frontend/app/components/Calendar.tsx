"use client";

import { useEffect, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
} from "date-fns";
import { ja } from "date-fns/locale/ja"; // ✅ 波カッコ付きでインポート
import CalendarCell from "./CalendarCell";
import CalendarHeader from "./CalendarHeader";
import { subMonths, addMonths } from "date-fns";
import type { ReactElement } from "react";

interface Diary {
  id: number;
  title: string;
  content: string;
  date: string;
}

interface CalendarProps {
  currentMonth: Date;
  diaries: Diary[];
  onMonthChange: (date: Date) => void;
}

export default function Calendar({ currentMonth, diaries, onMonthChange }: CalendarProps) {
  const [rows, setRows] = useState<React.ReactElement[][]>([]);

  useEffect(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale: ja });
    const endDate = endOfWeek(monthEnd, { locale: ja });

    let day = startDate;
    const tempRows = [];
    let days = [];

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        days.push(
          <CalendarCell
            key={day.toString()}
            day={day}
            currentMonth={currentMonth}
            diaries={diaries}
          />
        );
        day = addDays(day, 1);
      }
      tempRows.push([...days]);
      days = [];
    }

    setRows(tempRows);
  }, [currentMonth, diaries]);

  return (
    <div>
      <CalendarHeader
        currentMonth={currentMonth}
        onPrev={() => onMonthChange(subMonths(currentMonth, 1))}
        onNext={() => onMonthChange(addMonths(currentMonth, 1))}
      />
      <div className="space-y-2 bg-white p-4 rounded shadow">
        {rows.map((week, index) => (
          <div key={index} className="grid grid-cols-7 gap-2">
            {week}
          </div>
        ))}
      </div>
    </div>
  );
}