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
  const { setDataUser } = useAuth();

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

        localStorage.setItem("token", token);

        const user = await GetCurrentUser(token);

        const session = {
          login: true,
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            orders: [],
            profileImg: user.profileImg,
            isProfileComplete: user.isProfileComplete,
          },
        };

        setDataUser(session);

        localStorage.setItem("userSession", JSON.stringify(session));

        resetForm();

        router.push("/dashboard");
      } catch (error) {
        console.error(error);
        alert("Inicio de sesión incorrecto");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl p-8">

        {/* Titulo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">Bienvenido</h1>
          <p className="text-gray-400 text-sm mt-2">
            Inicia sesión para continuar en PowerGym
          </p>
        </div>

        {/* Google Login */}
        <section className="mb-6">
          <GoogleLoginButton />
        </section>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-px bg-zinc-700 w-full"></div>
          <span className="text-gray-400 text-sm">o</span>
          <div className="h-px bg-zinc-700 w-full"></div>
        </div>

        <form onSubmit={formik.handleSubmit}>

          <InputComponent
            type="email"
            placeholder="Correo electrónico"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
          />

          {formik.errors.email && formik.touched.email && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.email}
            </div>
          )}

          <div className="mt-4">
            <InputComponent
              type="password"
              placeholder="Contraseña"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
            />
          </div>

          {formik.errors.password && formik.touched.password && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          )}

          {/* Botón login */}
          <div className="flex justify-center mt-6">
            <ButtonComponent type="submit" label="Iniciar Sesión" />
          </div>

          {/* Register */}
          <p className="text-gray-400 flex justify-center gap-2 mt-6 text-sm">
            ¿Todavía no tienes una cuenta?
            <Link
              href={"register"}
              className="text-white relative transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-gray-300"
            >
              Regístrate
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default LoginComponent;