"use client";

import { useEffect, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  subMonths,
  addMonths,
} from "date-fns";
import { ja } from "date-fns/locale/ja";
import CalendarCell from "./CalendarCell";
import CalendarHeader from "./CalendarHeader";
import type { ReactElement } from "react";
import styles from "./Calendar.module.css"; // 👈 追加！

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

export default function Calendar({
  currentMonth,
  diaries,
  onMonthChange,
}: CalendarProps) {
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
      <div className={styles.calendarContainer}>
        {rows.map((week, index) => (
          <div key={index} className={styles.weekRow}>
            {week}
          </div>
        ))}
      </div>
    </div>
  );
}