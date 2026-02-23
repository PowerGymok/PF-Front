"use client";

import { RegisterUser, GetCurrentUser } from "@/services/user.services";
import {
  RegisterSchema,
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
       
        const res = await RegisterUser(values);

        if (!res?.accessToken) {
          throw new Error("Error al registrarse");
        }

        const token = res.accessToken;

        
        const user = await GetCurrentUser(token);

        console.log(formik.values.Birthdate)

        
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

      } catch (error: unknown) {
        alert(
          error instanceof Error
            ? error.message
            : "Error al registrarse"
        );
      }
    },
  });
  return (
    <section className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-md bg-neutral-900 text-white p-10 rounded-xl">
        <h1 className="text-3xl font-bold mb-2">Registro</h1>
        <p className="text-sm text-gray-400 mb-8">
          ¿Tiene registro?
          <span
            className="text-blue-400 cursor-pointer ml-1"
            onClick={() => router.push("/login")}
          >
            Clic aquí para iniciar sesión.
          </span>
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Nombre */}
          <div>
            <label className="text-sm">Nombre*</label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full bg-transparent border-b border-gray-500 focus:outline-none py-2"
            />
            {formik.errors.name && (
              <p className="text-red-400 text-xs">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm">Correo*</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full bg-transparent border-b border-gray-500 focus:outline-none py-2"
            />
            {formik.errors.email && (
              <p className="text-red-400 text-xs">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm">Contraseña*</label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="w-full bg-transparent border-b border-gray-500 focus:outline-none py-2"
            />
            {formik.errors.password && (
              <p className="text-red-400 text-xs">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm">Confirmar contraseña*</label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              className="w-full bg-transparent border-b border-gray-500 focus:outline-none py-2"
            />
            {formik.errors.confirmPassword && (
              <p className="text-red-400 text-xs">
                {formik.errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Dirección */}
          <div>
            <label className="text-sm">Dirección*</label>
            <input
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              className="w-full bg-transparent border-b border-gray-500 focus:outline-none py-2"
            />
            {formik.errors.address && (
              <p className="text-red-400 text-xs">{formik.errors.address}</p>
            )}
          </div>

          <div>
            <label className="text-sm">Ciudad*</label>
            <input
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            className="w-full bg-transparent border-b border-gray-500 focus:outline-none py-2"
            />
            {formik.errors.city && (
            <p className="text-red-400 text-xs">
            {formik.errors.city}
            </p>
            )}
          </div>
          
          <div>
            <label className="text-sm">Fecha de nacimiento*</label>
            <input
            type="date"
            name="Birthdate"
            value={formik.values.Birthdate}
            onChange={formik.handleChange}
            className="w-full bg-transparent border-b border-gray-500 focus:outline-none py-2"
            />
            {formik.errors.Birthdate && (
            <p className="text-red-400 text-xs">
            {formik.errors.Birthdate}
            </p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label className="text-sm">Teléfono*</label>
            <input
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="w-full bg-transparent border-b border-gray-500 focus:outline-none py-2"
            />
            {formik.errors.phone && (
              <p className="text-red-400 text-xs">{formik.errors.phone}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full mt-6 bg-white text-black py-3 font-semibold rounded"
          >
            {formik.isSubmitting ? "Registrando..." : "Registrarse"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegisterComponent;
