"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Link from "next/link"; // ← 編集ボタン用
import styles from "./DiaryDetail.module.css";

type Diary = {
  id: number;
  title: string;
  content: string;
  date: string; // ✅ 日記の日付も受け取る
};

export default function DiaryDetailPage() {
  const { id } = useParams();
  const [diary, setDiary] = useState<Diary | null>(null);

  const apiUrl =
    typeof window === "undefined"
      ? "http://dailynote_backend:3001/api/v1"
      : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api/v1";

      useEffect(() => {
        const token = localStorage.getItem("access-token");
        const client = localStorage.getItem("client");
        const uid = localStorage.getItem("uid");
      
        if (!token || !client || !uid) {
          console.error("トークン情報がありません");
          return;
        }
      
        fetch(`${apiUrl}/diaries/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "access-token": token,
            "client": client,
            "uid": uid,
          },
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(`取得失敗: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => setDiary(data))
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

        {/* ✅ 編集ボタン */}
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