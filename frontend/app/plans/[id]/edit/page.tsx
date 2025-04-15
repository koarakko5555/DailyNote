"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "../../PlanEdit.module.css";

export default function EditPlanPage() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const apiUrl =
    typeof window === "undefined"
      ? "http://dailynote_backend:3001/api/v1"
      : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api/v1";

  useEffect(() => {
    fetch(`${apiUrl}/plans/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setStartDate(data.start_date);
        setEndDate(data.end_date);
        setContent(data.content);
      })
      .catch((err) => console.error("取得エラー:", err));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const res = await fetch(`${apiUrl}/plans/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        plan: {
          title,
          start_date: startDate,
          end_date: endDate,
          content,
        },
      }),
    });

    if (!res.ok) {
      try {
        const data = await res.json();
        setErrors(data.errors || ["更新に失敗しました"]);
      } catch {
        setErrors(["更新に失敗しました"]);
      }
      return;
    }

    router.push(`/plans/${id}`);
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.heading}>✏️ 計画を編集</h1>

        {errors.length > 0 && (
          <div className={styles.errorBox}>
            <ul>
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
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
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={styles.input}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={styles.input}
          />
          <textarea
            placeholder="内容"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
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