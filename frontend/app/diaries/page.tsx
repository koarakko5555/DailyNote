"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchDiaries, deleteDiary } from "@/lib/api/diaries";
import styles from "./DiaryList.module.css";

type Diary = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export default function DiaryListPage() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    fetchDiaries()
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("日記データが配列ではありません:", data);
          return;
        }
        setDiaries(data);
      })
      .catch((err) => {
        console.error("日記取得エラー:", err);
      });
  }, []);

  const handleDelete = async (id: number) => {
    const ok = confirm("この日記を削除しますか？");
    if (!ok) return;

    try {
      await deleteDiary(id);
      setDiaries((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
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