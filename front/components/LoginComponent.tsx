"use client";

import { LoginUser, GetCurrentUser } from "@/services/user.services";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import InputComponent from "./InputComponent";
import { useAuth } from "@/app/contexts/AuthContext";
import { LoginInitialValues, LoginValidation } from "@/validators/loginSchema";




const LoginComponent = () => {
  const router = useRouter();
  const {setDataUser} = useAuth();

  const formik = useFormik({
    initialValues: LoginInitialValues,
    validationSchema: LoginValidation,

    onSubmit: async (values, { resetForm }) => {
  try {
    const res = await LoginUser(values);

    if (!res?.accessToken) {
      throw new Error("Credenciales incorrectas");
    }

    const token = res.accessToken;

    const user = await GetCurrentUser(token);

    setDataUser({
      login: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        orders: [],
      },
    });

    resetForm();
    router.push("/dashboard");

      } catch (error) {
    alert("Inicio de sesión incorrecto");
      }
    },
  });



  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      
      <form onSubmit={formik.handleSubmit}>
        <InputComponent
          type="email"
          placeholder="Correo electrónico"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="email"
        />{
            formik.errors.email && formik.touched.email && (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )
        }
        <InputComponent
          type="password"
          placeholder="Contraseña"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="password"
        />
        {
            formik.errors.password && formik.touched.password && (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )
        }
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">Iniciar Sesión</button>
        
      </form>
    </div>
  );
};

export default LoginComponent;
