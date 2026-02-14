import { LoginSchema } from "@/validators/loginSchema";

export const LoginUser = async (userData: LoginSchema) => {
    try {
        const res = await fetch("url_page_logn_real", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Error al iniciar sesión");
        } else {
            return await res.json();
        }
    } catch (error) {
        throw error;
    }
}


export const LoginUserMock = async (userData: LoginSchema) => {
    try {
        const res = await fetch(`https://694619e2ed253f51719d0f95.mockapi.io/api/v1/users?email=${userData.email}`, {
            method: "GET",
        })
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "Error al iniciar sesión");
        
        }

        const data = await res.json();
        if (data.length === 0) {
            throw new Error("Usuario no encontrado");
        }

        const user = data[0];

        if(user.password !== userData.password) {
            throw new Error("Contraseña incorrecta");
        }

        else {
            return user
        }
    } catch (error) {
        throw error;
        
    }
}
