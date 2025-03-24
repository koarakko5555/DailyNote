"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

type Diary = {
  id: number;
  title: string;
  content: string;
};

export default function Home() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const apiUrl =
    typeof window === "undefined"
      ? "http://dailynote_backend:3001/api/v1"
      : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api/v1";

  useEffect(() => {
    fetch(`${apiUrl}/diaries`)
      .then((res) => res.json())
      .then((data) => setDiaries(data))
      .catch((err) => console.error("APIエラー:", err));
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`${apiUrl}/diaries/${id}`, {
      method: "DELETE",
    });
    setDiaries(diaries.filter((diary) => diary.id !== id));
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">日記一覧</h1>

      <Link href="/new" className="inline-block mb-4 text-blue-500 underline">
        ＋ 新しく日記を書く
      </Link>

      <ul>
        {diaries.map((diary) => (
          <li key={diary.id} className="border p-4 mb-2">
            <h2 className="text-xl font-semibold">
              <Link href={`/${diary.id}`} className="hover:underline">
                {diary.title}
              </Link>
            </h2>
            {/* ✅ Markdown 表示部分 */}
            <div className="prose max-w-none">
              <ReactMarkdown>{diary.content}</ReactMarkdown>
            </div>
            <div className="mt-2 space-x-2">
              <Link href={`/edit/${diary.id}`} className="text-blue-500 underline">
                編集
              </Link>
              <button
                onClick={() => handleDelete(diary.id)}
                className="text-red-500 underline"
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}