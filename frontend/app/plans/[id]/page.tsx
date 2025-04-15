"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "../PlanDetail.module.css";

type Plan = {
  id: number;
  title: string;
  content: string;
  start_date: string;
  end_date: string;
};

export default function PlanDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [plan, setPlan] = useState<Plan | null>(null);

  const apiUrl =
    typeof window === "undefined"
      ? "http://dailynote_backend:3001/api/v1"
      : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api/v1";

  useEffect(() => {
    fetch(`${apiUrl}/plans/${id}`)
      .then((res) => res.json())
      .then((data) => setPlan(data))
      .catch((err) => console.error("取得エラー:", err));
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("本当に削除しますか？");
    if (!confirm) return;

    const res = await fetch(`${apiUrl}/plans/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/plans");
    } else {
      alert("削除に失敗しました");
    }
  };

  if (!plan) return <p>読み込み中...</p>;

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.heading}>{plan.title}</h1>
        <p className={styles.date}>
          {plan.start_date} 〜 {plan.end_date}
        </p>
        <p className={styles.content}>{plan.content}</p>

        <div className={styles.buttonRow}>
          <button
            onClick={() => router.push(`/plans/${id}/edit`)}
            className={styles.button}
          >
            編集
          </button>
          <button onClick={handleDelete} className={styles.deleteButton}>
            削除
          </button>
        </div>
      </div>
    </main>
  );
}