import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    parseISO,
  } from "date-fns";
  import CalendarCell from "./CalendarCell";
  import CalendarHeader from "./CalendarHeader"; // ← 追加
  import { subMonths, addMonths } from "date-fns";
  
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
  
  export default function Calendar({ currentMonth, diaries, onMonthChange }: CalendarProps) {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
  
    const rows = [];
    let days = [];
    let day = startDate;
  
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
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-2">
          {days}
        </div>
      );
      days = [];
    }
  
    return (
      <div>
        <CalendarHeader
            currentMonth={currentMonth}
            onPrev={() => onMonthChange(subMonths(currentMonth, 1))}
            onNext={() => onMonthChange(addMonths(currentMonth, 1))}
        />
        <div className="space-y-2 bg-white p-4 rounded shadow">{rows}</div>
      </div>
    );
  }