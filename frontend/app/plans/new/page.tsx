"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./PlanNewPage.module.css";
import { createPlan } from "@/lib/api/plans";

export default function NewPlanPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const result = await createPlan({
      title,
      start_date: startDate,
      end_date: endDate,
      content,
    });

    if (!result.success) {
      setErrors(result.errors || []);
      return;
    }

    router.push("/plans");
  };

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.heading}>🗓️ 計画を立てる</h1>

        {errors.length > 0 && (
          <div className={styles.errorBox}>
            <ul className="list-disc list-inside">
              {errors.map((err, index) => (
                <li key={index}>{err}</li>
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
            作成する
          </button>
        </form>
      </div>
    </main>
  );
}