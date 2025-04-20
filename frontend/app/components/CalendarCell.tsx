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

interface Plan {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
}

interface CalendarCellProps {
  day: Date;
  currentMonth: Date;
  diaries: Diary[];
  plans: Plan[]; // ✅ 追加
  isHoliday: boolean;
}

export default function CalendarCell({
  day,
  currentMonth,
  diaries,
  plans,
  isHoliday,
}: CalendarCellProps) {
  const [isCurrentMonth, setIsCurrentMonth] = useState(false);
  const [dayText, setDayText] = useState("");

  useEffect(() => {
    setIsCurrentMonth(isSameMonth(day, currentMonth));
    setDayText(format(day, "d"));
  }, [day, currentMonth]);

  const weekday = getDay(day);
  const isSaturday = weekday === 6;

  return (
    <div
      className={clsx(
        styles.cell,
        isCurrentMonth ? styles.currentMonth : styles.otherMonth,
        isSaturday && styles.saturday,
        isHoliday && styles.holiday
      )}
    >
      <div className={styles.dayText}>{dayText}</div>

      <ul className={styles.diaryList}>
        {diaries.map((diary) => (
          <li key={`diary-${diary.id}`}>
            <Link href={`/diary/${diary.id}`} className={styles.diaryItemLink}>
              📝 {diary.title}
            </Link>
          </li>
        ))}
        {plans.map((plan) => (
          <li key={`plan-${plan.id}`}>
            <Link href={`/plans/${plan.id}`} className={styles.planItemLink}>
              📌 {plan.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}