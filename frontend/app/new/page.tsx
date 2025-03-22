"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewDiaryPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/diaries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ diary: { title, content } }),
    });
    router.push("/"); // 一覧ページに戻る
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">新しい日記を投稿</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          投稿
        </button>
      </form>
    </main>
  );
}