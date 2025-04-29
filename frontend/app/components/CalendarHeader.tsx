"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale/ja";
import styles from "./CalendarHeader.module.css";

interface CalendarHeaderProps {
  currentMonth: Date;
  onPrev: () => void;
  onNext: () => void;
}

export default function CalendarHeader({ currentMonth, onPrev, onNext }: CalendarHeaderProps) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    const formatted = format(currentMonth, "yyyy年M月", { locale: ja });
    setTitle(formatted);
  }, [currentMonth]);

  return (
    <div className={styles.header}>
      <button onClick={onPrev} className={styles.button}>
        ←
      </button>
      <h1 className={styles.title}>{title}</h1>
      <button onClick={onNext} className={styles.button}>
        →
      </button>
    </div>
  );
}