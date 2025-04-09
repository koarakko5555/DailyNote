import {
  addDays,
  endOfMonth,
  endOfWeek,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ja } from "date-fns/locale";
import CalendarCell from "./CalendarCell";
import { Diary } from "../types";
import styles from "./CalendarGrid.module.css"; // 👈 追加

export default function CalendarGrid({
  currentMonth,
  diaries,
}: {
  currentMonth: Date;
  diaries: Diary[];
}) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { locale: ja });
  const endDate = endOfWeek(monthEnd, { locale: ja });

  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const dayDiaries = diaries.filter((d) =>
        isSameDay(parseISO(d.date), day)
      );

      days.push(
        <CalendarCell
          key={day.toString()}
          day={day}
          currentMonth={currentMonth}
          diaries={dayDiaries}
        />
      );

      day = addDays(day, 1);
    }

    rows.push(
      <div key={day.toString()} className={styles.weekRow}>
        {days}
      </div>
    );
    days = [];
  }

  return <div className={styles.gridContainer}>{rows}</div>;
}