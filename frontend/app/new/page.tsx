"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewDiaryPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<string[]>([]); // ← エラー状態を追加

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]); // 前回のエラーをリセット

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/diaries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ diary: { title, content } }),
    });

    if (!res.ok) {
      const data = await res.json();
      setErrors(data.errors || ["予期せぬエラーが発生しました"]);
      return;
    }

    router.push("/"); // 一覧に戻る
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">新しい日記を投稿</h1>

      {/* エラー表示 */}
      {errors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">
          <ul className="list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

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