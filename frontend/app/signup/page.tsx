"use client";

import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const res = await fetch("http://localhost:3001/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        password_confirmation: passwordConfirmation,
      }),
    });
  
    if (res.ok) {
      const data = await res.json();
      const accessToken = res.headers.get("access-token");
      const client = res.headers.get("client");
      const uid = res.headers.get("uid");
  
      if (accessToken && client && uid) {
        localStorage.setItem("access-token", accessToken);
        localStorage.setItem("client", client);
        localStorage.setItem("uid", uid);
        alert("サインアップ成功！");
      } else {
        alert("トークンが取得できませんでした");
      }
    } else {
      const error = await res.json();
      alert("サインアップ失敗: " + error.errors?.full_messages?.join(", ") || "不明なエラー");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto mt-10">
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2"
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2"
      />
      <input
        type="password"
        placeholder="パスワード確認"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        required
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white py-2 rounded">
        サインアップ
      </button>
    </form>
  );
}