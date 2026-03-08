import { CreateClassPayload } from "../interface/CreateClass";
import { AdminClass } from "@/interface/AdminClassInterface";


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
export const cancelClass = async (id: string, token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/class_schedule/cancel/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Error cancelando clase");
    }

    return await res.json();
  } catch (error) {
    console.error("Error cancelando clase", error);
    throw error;
  }
};

export const getClassHistory = async (token: string): Promise<AdminClass[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/class_schedule/history`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Error obteniendo el historial de clases");
    }

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error obteniendo el historial de clases", error);
    return [];
  }
};