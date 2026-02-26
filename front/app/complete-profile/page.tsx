'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {fetchWithAuth} from '@/helpers/fetchWithAuth';

export default function CompleteProfilePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    birthdate: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetchWithAuth('/users/complete-profile', {
        method: 'PUT',
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Error al completar el perfil');
      }

      router.push('/dashboard');
    } catch (err) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("Ocurrió un error inesperado");
  }
}
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-96 p-6 shadow-lg rounded-2xl"
      >
        <h2 className="text-xl font-semibold text-center">
          Completar Perfil
        </h2>

        {/* ADDRESS */}
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 rounded-md"
          required
        />

        {/* CITY */}
        <input
          type="text"
          name="city"
          placeholder="Ciudad"
          value={formData.city}
          onChange={handleChange}
          className="border p-2 rounded-md"
          required
        />

        {/* BIRTHDATE */}
        <input
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          className="border p-2 rounded-md"
          required
        />

        {/* PHONE */}
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 rounded-md"
          required
        />

        {error && (
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white p-2 rounded-md"
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </div>
  );
}