"use client";
import { useEffect, useState } from "react";

type Diary = {
  id: number;
  title: string;
  content: string;
};

export default function Home() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const apiUrl =
    typeof window === "undefined"
      ? "http://dailynote_backend:3001/api/v1" // ✅ サーバーサイド (Docker)
      : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api/v1"; // ✅ クライアントサイド

  useEffect(() => {
    console.log("API URL:", apiUrl); // 確認用

    fetch(`${apiUrl}/diaries`)
      .then((res) => res.json())
      .then((data) => setDiaries(data))
      .catch((err) => console.error("APIエラー:", err));
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">日記一覧</h1>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id} className="border p-4 mb-2">
            <h2 className="text-xl font-semibold">{diary.title}</h2>
            <p>{diary.content}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}