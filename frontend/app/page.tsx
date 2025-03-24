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
    <main className="bg-white text-gray-900 min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">日記一覧</h1>

        <Link href="/new" className="inline-block mb-6 text-blue-600 hover:underline">
          ＋ 新しく日記を書く
        </Link>

        <ul>
          {diaries.map((diary) => (
            <li key={diary.id} className="border border-gray-300 p-6 mb-4 rounded shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/${diary.id}`} className="hover:underline">
                  {diary.title}
                </Link>
              </h2>
              <div className="prose max-w-none mb-4">
                <ReactMarkdown>{diary.content}</ReactMarkdown>
              </div>
              <div className="flex space-x-4">
                <Link
                  href={`/edit/${diary.id}`}
                  className="text-blue-500 hover:underline"
                >
                  編集
                </Link>
                <button
                  onClick={() => handleDelete(diary.id)}
                  className="text-red-500 hover:underline"
                >
                  削除
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}