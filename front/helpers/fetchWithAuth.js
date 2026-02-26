"use client";

export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

    // 🟥 NO LOGUEADO
  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("401");
  }

  // 🟨 PERFIL INCOMPLETO
  if (res.status === 403) {
    throw new Error("403");
  }

  // 🟥 OTRO ERROR
  if (!res.ok) {
    throw new Error("Error");
  }

  return res.json();
};