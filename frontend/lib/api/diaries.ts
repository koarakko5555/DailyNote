// lib/api/diaries.ts

type DiaryPayload = {
    title: string;
    content: string;
    date: string;
  };
  
  function getAuthHeaders() {
    const accessToken = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");
  
    if (!accessToken || !client || !uid) {
      throw new Error("認証情報がありません");
    }
  
    return {
      "Content-Type": "application/json",
      "access-token": accessToken,
      client,
      uid,
    };
  }
  
  export async function fetchDiaries() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/diaries`, {
      headers: getAuthHeaders(),
    });
  
    if (!res.ok) throw new Error("日記取得に失敗しました");
  
    return await res.json();
  }
  
  export async function fetchDiary(id: string | number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/diaries/${id}`, {
      headers: getAuthHeaders(),
    });
  
    if (!res.ok) throw new Error("日記の取得に失敗しました");
  
    return await res.json();
  }
  
  export async function createDiary(payload: DiaryPayload): Promise<{ success: boolean; errors?: string[] }> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/diaries`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ diary: payload }),
    });
  
    if (!res.ok) {
      const data = await res.json();
      return { success: false, errors: data.errors || ["投稿に失敗しました"] };
    }
  
    return { success: true };
  }
  
  export async function updateDiary(id: number, payload: DiaryPayload): Promise<{ success: boolean; errors?: string[] }> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/diaries/${id}`, {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify({ diary: payload }),
    });
  
    if (!res.ok) {
      const data = await res.json();
      return { success: false, errors: data.errors || ["更新に失敗しました"] };
    }
  
    return { success: true };
  }
  
  export async function deleteDiary(id: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/diaries/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
  
    if (!res.ok) throw new Error("削除に失敗しました");
  }