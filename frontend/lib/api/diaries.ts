// lib/api/diaries.ts
export async function fetchDiaries() {
    const accessToken = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");
  
    if (!accessToken || !client || !uid) throw new Error("認証情報がありません");
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/diaries`, {
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        "client": client,
        "uid": uid,
      },
    });
  
    if (!res.ok) throw new Error("日記取得に失敗しました");
  
    return await res.json();
  }
  
  export async function deleteDiary(id: number) {
    const accessToken = localStorage.getItem("access-token");
    const client = localStorage.getItem("client");
    const uid = localStorage.getItem("uid");
  
    if (!accessToken || !client || !uid) throw new Error("認証情報がありません");
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/diaries/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken,
        "client": client,
        "uid": uid,
      },
    });
  
    if (!res.ok) throw new Error("削除に失敗しました");
  }