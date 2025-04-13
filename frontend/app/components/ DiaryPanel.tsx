"use client";

import Link from "next/link";
import styles from "./DiaryPanel.module.css";

export default function DiaryPanel() {
  return (
    <div className={styles.panel}>
      <div className={styles.label}>
        📔 <span>日記</span>
      </div>
      <Link href="/new" className={styles.addButton} aria-label="新規作成">
        ➕
      </Link>
    </div>
  );
}