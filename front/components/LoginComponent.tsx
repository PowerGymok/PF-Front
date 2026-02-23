"use client";

import { LoginUser, GetCurrentUser } from "@/services/user.services";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import InputComponent from "./InputComponent";
import { useAuth } from "@/app/contexts/AuthContext";
import { LoginInitialValues, LoginValidation } from "@/validators/loginSchema";
import ButtonComponent from "./ButtonComponent";
import GoogleLoginButton from "./GoogleLoginButton";
import Link from "next/link";




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

    localStorage.setItem("token", token)
    
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
    <div className="max-w-md mx-auto mt-10 p-10 px-4 mt-4">

      <section>
        <GoogleLoginButton />
      </section>

      <hr/>
      
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
        <div className="flex justify-center max-w-md mx-auto mt-10 ">
          <ButtonComponent type="submit" label="Iniciar Sesión" />
        </div>

        <div>
          <p className="text-gray-600 flex px-4 py-4 justify-center gap-2">
            Dont have an account ? <Link href={"register"} className="text-white">Sign up</Link>
          </p>
        </div>
        

        
      </form>
      
    </div>
  );
};

export default LoginComponent;
