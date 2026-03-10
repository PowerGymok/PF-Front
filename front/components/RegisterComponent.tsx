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

        const user = await GetCurrentUser(token);

        console.log(formik.values.Birthdate);

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
            isProfileComplete: user.isProfileComplete,
          },
        });

        resetForm();

        router.push("/dashboard");
      } catch (error: unknown) {
        alert(error instanceof Error ? error.message : "Error al registrarse");
      }
    },
  });

  return (
    <section className="min-h-screen bg-[#0b0b0b] flex items-center justify-center px-4 pt-10 pb-10">
      <div className="w-full max-w-md border border-neutral-800 bg-[#0f0f0f] text-white p-10 relative">

        <h1 className="text-4xl font-bold tracking-[6px] mb-2">
          REGISTRO
        </h1>

        <p className="text-sm text-neutral-400 mb-8">
          ¿Tiene registro?
          <span
            className="text-blue-500 cursor-pointer ml-1 hover:underline"
            onClick={() => router.push("/login")}
          >
            Clic aquí para iniciar sesión.
          </span>
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-6">

          {/* Nombre */}
          <div>
            <label className="text-xs uppercase tracking-[3px] text-neutral-400">
              Nombre*
            </label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full bg-transparent border-b border-neutral-700 focus:border-blue-500 focus:outline-none py-2"
            />
            {formik.errors.name && (
              <p className="text-blue-500 text-xs mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs uppercase tracking-[3px] text-neutral-400">
              Correo*
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full bg-transparent border-b border-neutral-700 focus:border-blue-500 focus:outline-none py-2"
            />
            {formik.errors.email && (
              <p className="text-blue-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-xs uppercase tracking-[3px] text-neutral-400">
              Contraseña*
            </label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="w-full bg-transparent border-b border-neutral-700 focus:border-blue-500 focus:outline-none py-2"
            />
            {formik.errors.password && (
              <p className="text-blue-500 text-xs mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-xs uppercase tracking-[3px] text-neutral-400">
              Confirmar contraseña*
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              className="w-full bg-transparent border-b border-neutral-700 focus:border-blue-500 focus:outline-none py-2"
            />
            {formik.errors.confirmPassword && (
              <p className="text-blue-500 text-xs mt-1">
                {formik.errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Dirección */}
          <div>
            <label className="text-xs uppercase tracking-[3px] text-neutral-400">
              Dirección*
            </label>
            <input
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              className="w-full bg-transparent border-b border-neutral-700 focus:border-blue-500 focus:outline-none py-2"
            />
            {formik.errors.address && (
              <p className="text-blue-500 text-xs mt-1">{formik.errors.address}</p>
            )}
          </div>

          {/* Ciudad */}
          <div>
            <label className="text-xs uppercase tracking-[3px] text-neutral-400">
              Ciudad*
            </label>
            <input
              type="text"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              className="w-full bg-transparent border-b border-neutral-700 focus:border-blue-500 focus:outline-none py-2"
            />
            {formik.errors.city && (
              <p className="text-blue-500 text-xs mt-1">{formik.errors.city}</p>
            )}
          </div>

          {/* Fecha */}
          <div>
            <label className="text-xs uppercase tracking-[3px] text-neutral-400">
              Fecha de nacimiento*
            </label>
            <input
              type="date"
              name="Birthdate"
              value={formik.values.Birthdate}
              onChange={formik.handleChange}
              className="w-full bg-transparent border-b border-neutral-700 focus:border-blue-500 focus:outline-none py-2"
            />
            {formik.errors.Birthdate && (
              <p className="text-blue-500 text-xs mt-1">{formik.errors.Birthdate}</p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label className="text-xs uppercase tracking-[3px] text-neutral-400">
              Teléfono*
            </label>
            <input
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="w-full bg-transparent border-b border-neutral-700 focus:border-blue-500 focus:outline-none py-2"
            />
            {formik.errors.phone && (
              <p className="text-blue-500 text-xs mt-1">{formik.errors.phone}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full mt-6 bg-blue-500 hover:bg-blue-700 transition py-4 tracking-[4px] font-semibold"
          >
            {formik.isSubmitting ? "Registrando..." : "CREAR CUENTA"}
          </button>

        </form>
      </div>
    </section>
  );
};

export default RegisterComponent;