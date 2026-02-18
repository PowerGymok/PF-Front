import { LoginSchema } from "@/validators/loginSchema";
import { RegisterSchema } from "@/validators/registerSchema";

export const LoginUser = async (userData: LoginSchema) => {
  try {
    const res = await fetch("url_page_logn_real", {
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

export const LoginUserMock = async (userData: LoginSchema) => {
  try {
    const res = await fetch(
      `https://694619e2ed253f51719d0f95.mockapi.io/api/v1/users?email=${userData.email}`,
      {
        method: "GET",
      },
    );
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message("Error al iniciar sesión"));
    }

    const data = await res.json();
    if (data.length === 0) {
      throw new Error("Usuario no encontrado");
    }

    const user = data[0];

    if (user.password !== userData.password) {
      throw new Error("Contraseña incorrecta");
    } else {
      return user;
    }
  } catch (error) {
    throw error;
  }
};

// export const RegisterUserMock = async (userData: RegisterSchema) => {
//   try {
//     // 1. Verificar si el email ya existe
//     const checkRes = await fetch(
//       `https://69922fd08f29113acd3d5963.mockapi.io/users?email=${userData.email}`
//     );

//     if (!checkRes.ok) throw new Error("Error al verificar usuario");

//     const existingUsers = await checkRes.json();

//     if (existingUsers.length > 0) {
//     throw new Error("El email ya está registrado");
//      }

//     // 2. Sacar confirmPassword
//     const { confirmPassword, ...userToSave } = userData;

//     // 3. Crear usuario
//     const res = await fetch(
//       "https://69922fd08f29113acd3d5963.mockapi.io/users",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userToSave),
//       }
//     );

//     if (!res.ok) {
//       throw new Error("Error al registrar el usuario");
//     }

//     const newUser = await res.json();

//     // 4. Devolver sin password
//     const { password, ...userWithoutPassword } = newUser;
//     return userWithoutPassword;

//   } catch (error) {
//   if (error instanceof Error) {
//     throw new Error(error.message);
//   }
//   throw new Error("Error al registrar el usuario");
// }
// };

export const RegisterUserMock = async (userData: RegisterSchema) => {
  try {
    const res = await fetch("https://69922fd08f29113acd3d5963.mockapi.io/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Error al registrar el usuario");
    } else {
      const newUser = await res.json();
      const { password, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    }
  } catch (error) {
    throw error;
  }
}