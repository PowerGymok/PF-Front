import { User } from "@/interface/User";
import { LoginSchema } from "@/validators/loginSchema";
import { RegisterSchema, RegisterPayload } from "@/validators/registerSchema";
import { AllUsers } from "@/interface/AllUsers";
import { CompleteProfileInterface } from "@/interface/CompleteProfileInterface";
import { mockCoaches } from "./mockCoaches";
import { get } from "http";


export const LoginUser = async (userData: LoginSchema) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al iniciar sesión");
    } else {
      return await res.json();
    }
  } catch (error) {
    throw error;
  }
};

export const GetCurrentUser = async (token: string) => {

 

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error obteniendo usuario");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};



export const RegisterUser = async (userData: RegisterPayload) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Error al registrar el usuario");
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Error al registrar el usuario");
  }
};

export const GetAllUsers = async (
  token: string,
  limit?: number,
): Promise<AllUsers[]> => {
  try {
    const url = limit
      ? `${process.env.NEXT_PUBLIC_API_URL}/users?limit=${limit}`
      : `${process.env.NEXT_PUBLIC_API_URL}/users`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error obteniendo usuarios");
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};

export const UpdateUserRole = async (
  userId: string,
  role: string,
  token: string,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/coach/promote/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    },
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.text();
};

export const GetUserById = async (id: string, token: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Error obteniendo usuario");
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Error obteniendo usuario");
  }
};

export const UpdateUserProfile = async (
  id: string,
  profileData: Partial<User>,
  token: string,
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      },
    );

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Error actualizando perfil");
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Error actualizando perfil");
  }
};

export const UserInactive = async (id: string, token: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/inactive/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Error desactivando usuario");
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Error desactivando usuario");
  }
};

export const UsersCompleteProfile = async (
  data: CompleteProfileInterface,
  token: string,
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/complete-profile`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Error completando perfil");
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Error completando perfil");
  }
};

export const getAllCoaches = async (token: string, limit?: number) => {
  try {
    const url = limit
      ? `${process.env.NEXT_PUBLIC_API_URL}/coach?limit=${limit}`
      : `${process.env.NEXT_PUBLIC_API_URL}/coach`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || "Error obteniendo coaches");
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Error obteniendo coaches");
  }
};

export const getPublicCoaches = async () => {
  try {
    //esperar a generar mi const res...
    return mockCoaches;
  } catch (error) {
    console.error("Error obteniendo coaches:", error);
    return [];
  }
};
