'use client'

import { LoginUserMock } from "@/services/user.services";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import InputComponent from "./InputComponent";


const LoginComponent = () => {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: async (values) => {
            try {
                const user = await LoginUserMock(values);
                console.log("Usuario autenticado:", user);
                setTimeout(() => {
                    router.push("/home");
                }, 1000);
                
            } catch (error) {
                console.error("Error al iniciar sesión:", error);
            }
        }
    })


    return (
        <div>
            <h1>Hola soy el login</h1>
            <form onSubmit={formik.handleSubmit}>
                <InputComponent type="email" placeholder="Correo electrónico" value={formik.values.email} onChange={formik.handleChange} name="email" />
                <InputComponent type="password" placeholder="Contraseña" value={formik.values.password} onChange={formik.handleChange} name="password" />
                <button type="submit">Iniciar Sesión</button>

            </form>

            
        </div>
    )
}

export default LoginComponent;