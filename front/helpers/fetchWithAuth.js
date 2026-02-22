"use client"
export const fetchWithAuth = async (
  url,
  options= {}
) => {

  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  // 🟥 NO LOGUEADO
  if (res.status === 401) {
    throw new Error("401");
  }

  // 🟨 PERFIL INCOMPLETO (Google)
  if (res.status === 403) {
    throw new Error("403");
  }

  // 🟥 OTRO ERROR
  if (!res.ok) {
    throw new Error("Error");
  }

  return res.json();
};