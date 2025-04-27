"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./signup.module.css"; // スタイル読み込み

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // 🔑 追加

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });
  
      if (!res.ok) {
        const errorRes = await res.json();
        setError(errorRes.errors?.full_messages?.join(", ") || "不明なエラー");
        return;
      }
  
      const headers = res.headers;
      localStorage.setItem("access-token", headers.get("access-token") || "");
      localStorage.setItem("client", headers.get("client") || "");
      localStorage.setItem("uid", headers.get("uid") || "");
  
      alert("サインアップ成功！");
      router.push("/");
    } catch {
      setError("エラーが発生しました");
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.container}>
        <h1 className={styles.heading}>サインアップ</h1>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="パスワード確認"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          サインアップ
        </button>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className={styles.linkButton} // ✅ ログインボタン用スタイル
        >
          ログインはこちら
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}