"use client";

import { LoginUserMock } from "@/services/user.services";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import InputComponent from "./InputComponent";
import { useAuth } from "@/app/contexts/AuthContext";



const LoginComponent = () => {
  const router = useRouter();
  const {setDataUser} = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values, {resetForm}) => {
      try {

        const user = await LoginUserMock(values);
        const mockToken = "mock-token";

        alert("Inicio de sesión exitoso");
        setDataUser({
            login: true,
            token: mockToken,
            user: user,
        });
        resetForm()

        setTimeout(() => {
          router.push("/home");
        }, 1000);

      } catch (error) {
        alert("Inicio de sesion incorrecto ");  
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
