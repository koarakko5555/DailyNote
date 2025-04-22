// app/logout/page.tsx or コンポーネント内
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // ローカルストレージから削除
    localStorage.removeItem("access-token");
    localStorage.removeItem("client");
    localStorage.removeItem("uid");

    alert("ログアウトしました");
    router.push("/login");
  }, [router]);

  return <p>ログアウト中...</p>;
}