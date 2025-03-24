// app/diary/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

type Diary = {
  id: number;
  title: string;
  content: string;
};

export default function DiaryDetailPage() {
  const { id } = useParams();
  const [diary, setDiary] = useState<Diary | null>(null);
  const apiUrl =
    typeof window === "undefined"
      ? "http://dailynote_backend:3001/api/v1"
      : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api/v1";

  useEffect(() => {
    fetch(`${apiUrl}/diaries/${id}`)
      .then((res) => res.json())
      .then((data) => setDiary(data))
      .catch((err) => console.error("取得エラー:", err));
  }, [id]);

  if (!diary) return <p>読み込み中...</p>;

  return (
    <main className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 underline mb-4 block">
        ← 一覧へ戻る
      </Link>
      <h1 className="text-3xl font-bold mb-2">{diary.title}</h1>
      <div className="prose max-w-none">
        <ReactMarkdown>{diary.content}</ReactMarkdown>
      </div>
    </main>
  );
}