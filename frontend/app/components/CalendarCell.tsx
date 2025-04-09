"use client";

import { useEffect, useState } from "react";
import { isSameDay, isSameMonth, parseISO, format } from "date-fns";
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
      className={clsx(
        styles.cell,
        isCurrentMonth ? styles.currentMonth : styles.otherMonth
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