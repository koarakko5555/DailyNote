// app/edit/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function EditDiaryPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const apiUrl =
    typeof window === "undefined"
      ? "http://dailynote_backend:3001/api/v1"
      : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api/v1";

  useEffect(() => {
    fetch(`${apiUrl}/diaries/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
      })
      .catch((err) => console.error("データ取得エラー:", err));
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${apiUrl}/diaries/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ diary: { title, content } }),
    });

    if (res.ok) {
      router.push("/");
    } else {
      console.error("更新エラー:", await res.json());
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">日記を編集</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-semibold">タイトル</label>
          <input
            className="w-full border p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold">内容</label>
          <textarea
            className="w-full border p-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          更新
        </button>
      </form>
    </main>
  );
}
