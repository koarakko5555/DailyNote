import {
  addDays,
  endOfMonth,
  endOfWeek,
  isSameDay,
  parseISO,
  startOfMonth,
  startOfWeek,
  getDay,
} from "date-fns";
import { ja } from "date-fns/locale";
import CalendarCell from "./CalendarCell";
import { Diary } from "../types";
import { isJapaneseHoliday } from "@/lib/holiday"; // 👈 追加
import styles from "./CalendarGrid.module.css";

export default function CalendarGrid({
  currentMonth,
  diaries,
  plans,
}: {
  currentMonth: Date;
  diaries: Diary[];
  plans: {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
  }[];
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

      const isSunday = getDay(day) === 0;
      const isHoliday = isSunday || isJapaneseHoliday(day); // 👈 判定追加

      days.push(
        <CalendarCell
          key={day.toString()}
          day={day}
          currentMonth={currentMonth}
          diaries={dayDiaries}
          plans={plans}
          isHoliday={isHoliday} // 👈 渡す
        />
      );

      day = addDays(day, 1);
    }

    rows.push(
      <div key={day.toString()} className={styles.weekRow}>
        {days}å
      </div>
    );
    days = [];
  }

  return <div className={styles.gridContainer}>{rows}</div>;
}