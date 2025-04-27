"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./DiaryList.module.css";

type Diary = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export default function DiaryListPage() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  const apiUrl =
    typeof window === "undefined"
      ? "http://dailynote_backend:3001/api/v1"
      : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api/v1";

  useEffect(() => {
    const fetchDiaries = async () => {
      const accessToken = localStorage.getItem("access-token");
      const client = localStorage.getItem("client");
      const uid = localStorage.getItem("uid");

      if (!accessToken || !client || !uid) {
        console.error("トークン情報がありません");
        return;
      }

      try {
        const res = await fetch(`${apiUrl}/diaries`, {
          headers: {
            "Content-Type": "application/json",
            "access-token": accessToken,
            "client": client,
            "uid": uid,
          },
        });

        if (!res.ok) {
          console.error("日記取得失敗");
          return;
        }

        const data = await res.json();
        setDiaries(data);
      } catch (err) {
        console.error("APIエラー:", err);
      }
    };

    fetchDiaries();
  }, []);

  const handleDelete = async (id: number) => {
    const ok = confirm("この日記を削除しますか？");
    if (!ok) return;

    const accessToken = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");

    if (!accessToken || !client || !uid) {
      alert("トークン情報がありません");
      return;
    }

    const res = await fetch(`${apiUrl}/diaries/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        "client": client,
        "uid": uid,
      },
    });

    if (res.ok) {
      setDiaries((prev) => prev.filter((d) => d.id !== id));
    } else {
      alert("削除に失敗しました");
    }
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.heading}>📄 日記一覧</h1>

        {diaries.length === 0 ? (
          <p className={styles.emptyText}>まだ日記がありません。</p>
        ) : (
          <ul className={styles.diaryList}>
            {diaries.map((diary) => (
              <li key={diary.id} className={styles.diaryItem}>
                <div className={styles.itemHeader}>
                  <Link href={`/diaries/${diary.id}`} className={styles.diaryTitle}>
                    {diary.title}
                  </Link>
                  <button
                    onClick={() => handleDelete(diary.id)}
                    className={styles.deleteButton}
                    aria-label="削除"
                  >
                    🗑️
                  </button>
                </div>
                <p className={styles.diaryDate}>{diary.date}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}