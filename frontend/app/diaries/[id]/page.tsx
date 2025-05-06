"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { fetchDiary, deleteDiary } from "@/lib/api/diaries";
import styles from "./DiaryDetail.module.css";

type Diary = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export default function DiaryDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [diary, setDiary] = useState<Diary | null>(null);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    fetchDiary(id)
      .then(setDiary)
      .catch((err) => console.error("取得エラー:", err));
  }, [id]);

  const handleDelete = async () => {
    const ok = window.confirm("本当に削除しますか？");
    if (!ok) return;

    try {
      await deleteDiary(parseInt(id as string, 10));
      router.push("/diaries");
    } catch (err) {
      alert("削除に失敗しました");
    }
  };

  if (!diary) return <p className={styles.pageWrapper}>読み込み中...</p>;

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>{diary.title}</h1>
        <p className={styles.date}>📅 {diary.date}</p>
        <div className={styles.content}>
          <ReactMarkdown>{diary.content}</ReactMarkdown>
        </div>

        <div className={styles.buttonRow}>
          <button
            onClick={() => router.push(`/diaries/${diary.id}/edit`)}
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