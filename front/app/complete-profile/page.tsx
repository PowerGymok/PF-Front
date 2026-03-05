"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/helpers/fetchWithAuth";
import { useAuth } from "@/app/contexts/AuthContext";

export default function CompleteProfilePage() {
  const router = useRouter();
  const { setDataUser } = useAuth();

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    birthdate: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ✅ Guardar perfil
      await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/users/complete-profile`,
        {
          method: "PATCH",
          body: JSON.stringify({
            address: formData.address,
            city: formData.city,
            phone: Number(formData.phone),
            Birthdate: formData.birthdate,
          }),
        },
      );

      // ✅ Obtener usuario actualizado
      const token = localStorage.getItem("token");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Error al obtener el usuario actualizado");
      }

      const data = await res.json();

      // ✅ Actualizar contexto
      setDataUser({
        login: true,
        token: token!,
        user: {
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role,
          phone: data.phone,
          orders: data.orders || [],
          isProfileComplete: data.isProfileComplete,
        },
      });

      // ✅ Volver al dashboard
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <h1 className="text-xl text-center mb-4">Completar Perfil</h1>

        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 rounded-md bg-white text-black"
          required
        />

        <input
          type="text"
          name="city"
          placeholder="Ciudad"
          value={formData.city}
          onChange={handleChange}
          className="border p-2 rounded-md bg-white text-black"
          required
        />

        <input
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          className="border p-2 rounded-md bg-white text-black"
          required
        />

        <input
          type="number"
          name="phone"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 rounded-md bg-white text-black"
          required
        />

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
}
