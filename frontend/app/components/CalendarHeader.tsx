// components/CalendarHeader.tsx
import { format } from "date-fns";
import { ja } from "date-fns/locale"; 

interface CalendarHeaderProps {
  currentMonth: Date;
  onPrev: () => void;
  onNext: () => void;
}

export default function CalendarHeader({ currentMonth, onPrev, onNext }: CalendarHeaderProps) {
  const title = format(currentMonth, "yyyy年M月", { locale: ja });

  return (
    <div className="flex justify-between items-center mb-6">
      <button onClick={onPrev} className="text-2xl font-bold px-2 hover:text-purple-700">
        ←
      </button>
      <h1 className="text-2xl font-bold text-center">{title}</h1>
      <button onClick={onNext} className="text-2xl font-bold px-2 hover:text-purple-700">
        →
      </button>
    </div>
  );
}