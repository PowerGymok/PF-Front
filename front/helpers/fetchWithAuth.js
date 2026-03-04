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

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("No autorizado");
  }

  if (res.status === 403) {
    throw new Error("Perfil incompleto");
  }

  const contentType = res.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("El servidor no devolvió JSON válido");
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Error en la petición");
  }

  return data;
};