import { addDays, endOfMonth, endOfWeek, isSameDay, isSameMonth, parseISO, startOfMonth, startOfWeek } from "date-fns";
import { ja } from "date-fns/locale";
import CalendarCell from "./CalendarCell";
import { Diary } from "../types";

export default function CalendarGrid({ currentMonth, diaries }: { currentMonth: Date; diaries: Diary[] }) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { locale: ja });
  const endDate = endOfWeek(monthEnd, { locale: ja });

  const rows = [];
  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const formattedDate = day.toISOString().split("T")[0];
      const dayDiaries = diaries.filter((d) => isSameDay(parseISO(d.date), day));

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
      <div key={day.toString()} className="grid grid-cols-7 gap-2">
        {days}
      </div>
    );
    days = [];
  }

  return <div className="space-y-2 bg-white p-4 rounded shadow">{rows}</div>;
}
