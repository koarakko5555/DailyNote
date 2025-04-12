"use client";

import { useEffect, useState } from "react";
import { isSameDay, isSameMonth, parseISO, format, getDay } from "date-fns";
import Link from "next/link";
import clsx from "clsx";
import styles from "./CalendarCell.module.css";

interface Diary {
  id: number;
  title: string;
  date: string;
}

interface CalendarCellProps {
  day: Date;
  currentMonth: Date;
  diaries: Diary[];
  isHoliday: boolean; // 👈 追加
}

export default function CalendarCell({
  day,
  currentMonth,
  diaries,
  isHoliday, // 👈 追加
}: CalendarCellProps) {
  const [isCurrentMonth, setIsCurrentMonth] = useState(false);
  const [dayText, setDayText] = useState("");

  useEffect(() => {
    setIsCurrentMonth(isSameMonth(day, currentMonth));
    setDayText(format(day, "d"));
  }, [day, currentMonth]);

  const dayDiaries = diaries.filter((d) => isSameDay(parseISO(d.date), day));

  const weekday = getDay(day); // 0:日曜, 6:土曜
  const isSaturday = weekday === 6;

  return (
    <div
      className={clsx(
        styles.cell,
        isCurrentMonth ? styles.currentMonth : styles.otherMonth,
        isSaturday && styles.saturday,
        isHoliday && styles.holiday // 👈 isHoliday によって祝日マーク
      )}
    >
      <div className={styles.dayText}>{dayText}</div>
      <ul className={styles.diaryList}>
        {dayDiaries.map((diary) => (
          <li key={diary.id}>
            <Link href={`/${diary.id}`} className={styles.diaryItemLink}>
              {diary.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}