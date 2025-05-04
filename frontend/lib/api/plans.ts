// lib/api/plans.ts

export type Plan = {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    content: string;
  };
  
  export async function fetchPlans(): Promise<Plan[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/plans`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) {
      throw new Error("計画の取得に失敗しました");
    }
  
    return await res.json();
  }

  export async function fetchPlan(id: string | number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/plans/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) throw new Error("計画の取得に失敗しました");
  
    return await res.json();
  }
  
  export async function deletePlan(id: string | number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/plans/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) throw new Error("計画の削除に失敗しました");
  }

  export async function updatePlan(
    id: string | number,
    {
      title,
      start_date,
      end_date,
      content,
    }: {
      title: string;
      start_date: string;
      end_date: string;
      content: string;
    }
  ): Promise<{ success: boolean; errors?: string[] }> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/plans/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan: { title, start_date, end_date, content },
      }),
    });
  
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        success: false,
        errors: data.errors || ["更新に失敗しました"],
      };
    }
  
    return { success: true };
  }

  export async function createPlan({
    title,
    start_date,
    end_date,
    content,
  }: {
    title: string;
    start_date: string;
    end_date: string;
    content: string;
  }): Promise<{ success: boolean; errors?: string[] }> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan: { title, start_date, end_date, content },
      }),
    });
  
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { success: false, errors: data.errors || ["作成に失敗しました"] };
    }
  
    return { success: true };
  }