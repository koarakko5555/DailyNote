"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./PlanList.module.css";
import { fetchPlans, Plan } from "@/lib/api/plans"; // ✅ API関数をインポート

export default function PlanListPage() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    fetchPlans()
      .then((data) => setPlans(data))
      .catch((err) => console.error("APIエラー:", err));
  }, []);

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.card}>
        <h1 className={styles.heading}>📋 計画一覧</h1>

        {plans.length === 0 ? (
          <p className={styles.emptyText}>まだ計画がありません。</p>
        ) : (
          <ul className={styles.planList}>
            {plans.map((plan) => (
              <li key={plan.id} className={styles.planItem}>
                <Link href={`/plans/${plan.id}`} className={styles.planTitle}>
                  {plan.title}
                </Link>
                <p className={styles.planDates}>
                  {plan.start_date} 〜 {plan.end_date}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}