import { User } from "@/interface/User";
import { LoginSchema } from "@/validators/loginSchema";
import { RegisterSchema, RegisterPayload } from "@/validators/registerSchema";
import { AllUsers } from "@/interface/AllUsers";

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

export const GetAllUsers = async (token: string): Promise<AllUsers[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
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
