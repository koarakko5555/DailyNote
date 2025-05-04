"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchDiary, updateDiary } from "@/lib/api/diaries";
import styles from "./DiaryEditPage.module.css";

export default function EditDiaryPage() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return;
    fetchDiary(Number(id))
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
        setDate(data.date);
      })
      .catch((err) => console.error("取得エラー:", err));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    try {
      await updateDiary(Number(id), { title, content, date });
      router.push(`/diaries/${id}`);
    } catch (err: any) {
      setErrors(err.message ? [err.message] : ["更新に失敗しました"]);
    }
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.heading}>✏️ 日記を編集</h1>

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
            更新する
          </button>
        </form>
      </div>
    </main>
  );
}