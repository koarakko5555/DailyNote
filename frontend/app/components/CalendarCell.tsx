// components/CalendarCell.tsx
import { isSameDay, isSameMonth, parseISO, format } from "date-fns";
import Link from "next/link";

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
  const dayDiaries = diaries.filter((d) => isSameDay(parseISO(d.date), day));

  return (
    <div
      className={`border p-2 min-h-[100px] rounded-lg ${
        isSameMonth(day, currentMonth) ? "bg-white text-gray-900" : "bg-gray-100 text-gray-400"
      }`}
    >
      <div className="font-semibold">{format(day, "d")}</div>
      <ul className="mt-1 space-y-1 max-h-[80px] overflow-y-auto text-sm">
        {dayDiaries.map((diary) => (
          <li key={diary.id}>
            <Link
              href={`/${diary.id}`}
              className="text-blue-600 hover:underline block truncate"
            >
              {diary.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}