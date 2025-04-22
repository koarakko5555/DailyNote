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

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        password_confirmation: passwordConfirmation,
      }),
    });

    if (res.ok) {
      const accessToken = res.headers.get("access-token");
      const client = res.headers.get("client");
      const uid = res.headers.get("uid");

      if (accessToken && client && uid) {
        localStorage.setItem("access-token", accessToken);
        localStorage.setItem("client", client);
        localStorage.setItem("uid", uid);
        alert("サインアップ成功！");
        router.push("/"); // 成功したらTOPへ遷移
      } else {
        alert("トークンが取得できませんでした");
      }
    } else {
      const errorRes = await res.json();
      setError(errorRes.errors?.full_messages?.join(", ") || "不明なエラー");
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