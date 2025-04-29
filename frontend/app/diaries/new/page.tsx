"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./NewDiaryPage.module.css";

export default function NewDiaryPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    // 🔑 ローカルストレージから認証情報を取得
    const token = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/diaries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": token || "",
        "client": client || "",
        "uid": uid || "",
      },
      body: JSON.stringify({ diary: { title, content, date } }),
    });

    if (!res.ok) {
      const data = await res.json();
      setErrors(data.errors || ["予期せぬエラーが発生しました"]);
      return;
    }

    router.push("/");
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.heading}>📔 新しい日記を投稿</h1>

        {errors.length > 0 && (
          <div className={styles.errorBox}>
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
            className={styles.input}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={styles.input}
          />
          <textarea
            placeholder="内容"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            投稿
          </button>
        </form>
      </div>
    </main>
  );
}