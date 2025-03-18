export const fetchDiaries = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/diaries`);
    if (!res.ok) throw new Error("Failed to fetch diaries");
    return await res.json();
  };