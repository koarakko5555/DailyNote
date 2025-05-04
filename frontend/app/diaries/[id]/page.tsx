"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { fetchDiary } from "@/lib/api/diaries"; // ✅ 切り出したAPIを読み込み
import styles from "./DiaryDetail.module.css";

type Diary = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export default function DiaryDetailPage() {
  const { id } = useParams();
  const [diary, setDiary] = useState<Diary | null>(null);

  useEffect(() => {
    if (!id || typeof id !== "string") return;

    fetchDiary(id)
      .then(setDiary)
      .catch((err) => console.error("取得エラー:", err));
  }, [id]);

  if (!diary) return <p className={styles.pageWrapper}>読み込み中...</p>;

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>{diary.title}</h1>
        <p className={styles.date}>📅 {diary.date}</p>
        <div className={styles.content}>
          <ReactMarkdown>{diary.content}</ReactMarkdown>
        </div>

        <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
          <Link
            href={`/diaries/${diary.id}/edit`}
            className="text-sm text-blue-600 underline"
          >
            ✏️ 編集する
          </Link>
        </div>
      </div>
    </main>
  );
}