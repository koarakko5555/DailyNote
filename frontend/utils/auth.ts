// utils/auth.ts
export const isLoggedIn = () => {
    if (typeof window === "undefined") return false;
    return (
      localStorage.getItem("access-token") &&
      localStorage.getItem("client") &&
      localStorage.getItem("uid")
    );
  };