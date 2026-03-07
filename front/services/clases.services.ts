import { CreateClassPayload } from "../interface/CreateClass";

export const createClass = async (
  token: string,
  payload: CreateClassPayload
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/clases/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error creando la clase");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const getUserClasses = async (token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clases/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error obteniendo las clases del usuario");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}