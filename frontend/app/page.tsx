"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Calendar from "./components/Calendar";

type Diary = {
  id: number;
  title: string;
  content: string;
  date: string;
};

type Plan = {
  id: number;
  title: string;
  start_date: string;
  end_date: string;
};

export default function Home() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const router = useRouter();

  const apiUrl =
    typeof window === "undefined"
      ? "http://dailynote_backend:3001/api/v1"
      : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api/v1";

  // ✅ ログインチェック（トークンがない場合は /login へリダイレクト）
  useEffect(() => {
    const token = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    if (!token || !client || !uid) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");
  
    if (!token || !client || !uid) {
      console.error("トークン情報がありません");
      return;
    }
  
    fetch(`${apiUrl}/diaries`, {
      headers: {
        "Content-Type": "application/json",
        "access-token": token,
        "client": client,
        "uid": uid,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`日記取得失敗: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("日記データが配列ではありません:", data);
          return;
        }
        setDiaries(data);
      })
      .catch((err) => console.error("日記APIエラー:", err));
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/plans`)
      .then((res) => res.json())
      .then((data) => setPlans(data))
      .catch((err) => console.error("計画APIエラー:", err));
  }, []);

  return (
    <main className="bg-[#eef4ed] text-gray-900 min-h-screen">
      <div className="max-w-5xl mx-auto p-6">
        <Calendar
          currentMonth={currentMonth}
          diaries={diaries}
          plans={plans}
          onMonthChange={(date) => setCurrentMonth(date)}
        />
      </div>
    </main>
  );
}