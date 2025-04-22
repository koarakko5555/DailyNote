"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("client");
    localStorage.removeItem("uid");
    router.push("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>📅 カレンダー</Link>
          <Link href="/diaries" className={styles.link}>📄 日記一覧</Link>
          <Link href="/diaries/new" className={styles.link}>✏️ 日記作成</Link>
          <Link href="/plans" className={styles.link}>🗓️ 計画一覧</Link>
          <Link href="/plans/new" className={styles.link}>➕ 計画作成</Link>
          <button onClick={handleLogout} className={styles.link}>🚪 ログアウト</button>
        </nav>
      </div>
    </header>
  );
}