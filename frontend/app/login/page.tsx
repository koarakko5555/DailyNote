"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./login.module.css"; // CSS モジュール読み込み

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign_in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setError("ログインに失敗しました");
        return;
      }

      const headers = res.headers;
      localStorage.setItem("access-token", headers.get("access-token") || "");
      localStorage.setItem("client", headers.get("client") || "");
      localStorage.setItem("uid", headers.get("uid") || "");

      router.push("/");
    } catch {
      setError("エラーが発生しました");
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleLogin} className={styles.container}>
        <h1 className={styles.heading}>ログイン</h1>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          ログイン
        </button>

        <button
          type="button"
          onClick={() => router.push("/signup")}
          className={styles.linkButton}
        >
          サインアップはこちら
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}