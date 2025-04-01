"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale/ja"; // ✅ 波カッコ付きでインポートd

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