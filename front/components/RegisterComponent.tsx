"use client";

import { RegisterUser, GetCurrentUser } from "@/services/user.services";
import {
  RegisterSchema,
  RegisterPayload,
  RegisterValues,
  RegisterSchemaYup,
} from "@/validators/registerSchema";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

const RegisterComponent = () => {
  const router = useRouter();
  const { setDataUser } = useAuth();

  const formik = useFormik<RegisterSchema>({
    initialValues: RegisterValues,
    validationSchema: RegisterSchemaYup,

    onSubmit: async (values, { resetForm }) => {
      try {
        const cleanPhone = values.phone?.replace(/\D/g, "") || "";

        if (!cleanPhone) {
          throw new Error("Teléfono inválido");
        }

        const payload: RegisterPayload = {
          name: values.name,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          address: values.address,
          city: values.city,
          Birthdate: values.Birthdate,
          phone: cleanPhone,
        };

        const res = await RegisterUser(payload);

          if (!res?.accessToken) {
            throw new Error("Error al registrarse");
            }

          const token = res.accessToken;

          setDataUser({
            login: true,
            token,
            user: {
            id: res.user.id,
            name: res.user.name,
            email: res.user.email,
            role: res.user.role,
            phone: res.user.phone,
            orders: [],
            isProfileComplete: res.user.isProfileComplete,
          },
        });

        resetForm();

        router.push("/users/dashboard");
      } catch (error: unknown) {
        alert(error instanceof Error ? error.message : "Error al registrarse");
      }
    },
  });

  return (
    <section className="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-4 py-16">

      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 text-white p-10 rounded-3xl shadow-2xl">

        <h1 className="text-3xl font-bold text-center mb-2">
          Registro
        </h1>

        <p className="text-sm text-gray-400 text-center mb-8">
          ¿Ya tienes una cuenta?
          <span
            className="text-white cursor-pointer ml-1 hover:underline"
            onClick={() => router.push("/login")}
          >
            Inicia sesión
          </span>
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-5">

          {/* Nombre */}
          <div>
            <label className="text-xs text-gray-400">NOMBRE *</label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full mt-1 px-3 py-2 bg-transparent border border-zinc-700 rounded-lg focus:outline-none focus:border-white"
            />
            {formik.errors.name && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs text-gray-400">CORREO *</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full mt-1 px-3 py-2 bg-transparent border border-zinc-700 rounded-lg focus:outline-none focus:border-white"
            />
            {formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-xs text-gray-400">CONTRASEÑA *</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="w-full mt-1 px-3 py-2 bg-transparent border border-zinc-700 rounded-lg focus:outline-none focus:border-white"
            />
            {formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-xs text-gray-400">
              CONFIRMAR CONTRASEÑA *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              className="w-full mt-1 px-3 py-2 bg-transparent border border-zinc-700 rounded-lg focus:outline-none focus:border-white"
            />
            {formik.errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Dirección + Ciudad */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-xs text-gray-400">DIRECCIÓN *</label>
              <input
                type="text"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                className="w-full mt-1 px-3 py-2 bg-transparent border border-zinc-700 rounded-lg focus:outline-none focus:border-white"
              />
              {formik.errors.address && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.address}</p>
              )}
            </div>

            <div>
              <label className="text-xs text-gray-400">CIUDAD *</label>
              <input
                type="text"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                className="w-full mt-1 px-3 py-2 bg-transparent border border-zinc-700 rounded-lg focus:outline-none focus:border-white"
              />
              {formik.errors.city && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.city}</p>
              )}
            </div>

          </div>

          {/* Fecha + Teléfono */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-xs text-gray-400">
                FECHA DE NACIMIENTO *
              </label>
              <input
                type="date"
                name="Birthdate"
                value={formik.values.Birthdate}
                onChange={formik.handleChange}
                className="w-full mt-1 px-3 py-2 bg-transparent border border-zinc-700 rounded-lg focus:outline-none focus:border-white"
              />
              {formik.errors.Birthdate && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.Birthdate}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs text-gray-400">TELÉFONO *</label>
              <input
                type="text"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                className="w-full mt-1 px-3 py-2 bg-transparent border border-zinc-700 rounded-lg focus:outline-none focus:border-white"
              />
              {formik.errors.phone && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
              )}
            </div>

          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full mt-6 bg-gray-200 text-black hover:bg-white transition py-3 rounded-xl font-semibold"
          >
            {formik.isSubmitting ? "Registrando..." : "Regístrate"}
          </button>

        </form>

      </div>
    </section>
  );
};

export default RegisterComponent;