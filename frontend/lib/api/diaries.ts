// lib/api/diaries.ts

export async function fetchDiaries() {
    const accessToken = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");
  
    if (!accessToken || !client || !uid) {
      throw new Error("認証情報がありません");
    }
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/diaries`, {
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        "client": client,
        "uid": uid,
      },
    });
  
    if (!res.ok) {
      throw new Error("日記取得に失敗しました");
    }
  
    return await res.json();
  }
  
  export async function createDiary({
    title,
    content,
    date,
  }: {
    title: string;
    content: string;
    date: string;
  }) {
    const accessToken = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");
  
    if (!accessToken || !client || !uid) {
      return { success: false, errors: ["認証情報がありません"] };
    }
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/diaries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        "client": client,
        "uid": uid,
      },
      body: JSON.stringify({ diary: { title, content, date } }),
    });
  
    if (!res.ok) {
      const data = await res.json();
      return { success: false, errors: data.errors || ["投稿に失敗しました"] };
    }
  
    return { success: true };
  }
  
  export async function deleteDiary(id: number) {
    const accessToken = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");
  
    if (!accessToken || !client || !uid) {
      throw new Error("認証情報がありません");
    }
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/diaries/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        "client": client,
        "uid": uid,
      },
    });
  
    if (!res.ok) {
      throw new Error("削除に失敗しました");
    }
  }