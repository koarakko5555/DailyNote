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
  isSameDay,
  parseISO,
  getDay,
  isAfter,
  isBefore,
} from "date-fns";
import { ja } from "date-fns/locale/ja";
import CalendarCell from "./CalendarCell";
import CalendarHeader from "./CalendarHeader";
import { isJapaneseHoliday } from "@/lib/holiday";
import type { ReactElement } from "react";
import styles from "./Calendar.module.css";

interface Diary {
  id: number;
  title: string;
  content: string;
  date: string;
}

interface Plan {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
}

interface CalendarProps {
  currentMonth: Date;
  diaries: Diary[];
  plans: Plan[]; 
  onMonthChange: (date: Date) => void;
}

export default function Calendar({
  currentMonth,
  diaries,
  plans,
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
        const dayDiaries = diaries.filter((d) =>
          isSameDay(parseISO(d.date), day)
        );

        const dayPlans = (plans ?? []).filter((p) => {
          const start = parseISO(p.start_date);
          const end = parseISO(p.end_date);
          return (
            (isSameDay(day, start) || isAfter(day, start)) &&
            (isSameDay(day, end) || isBefore(day, end))
          );
        });

        const isSunday = getDay(day) === 0;
        const isHoliday = isSunday || isJapaneseHoliday(day);

        days.push(
          <CalendarCell
            key={day.toString()}
            day={day}
            currentMonth={currentMonth}
            diaries={dayDiaries}
            plans={dayPlans} // ✅ 渡す
            isHoliday={isHoliday}
          />
        );

        day = addDays(day, 1);
      }
      tempRows.push([...days]);
      days = [];
    }

    setRows(tempRows);
  }, [currentMonth, diaries, plans]);

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