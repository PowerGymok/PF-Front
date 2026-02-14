import * as Yup from "yup";

export interface RegisterSchema {
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
    address:string;
    phone:string;
}

export const RegisterValues: RegisterSchema = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
}

export const RegisterSchemaYup = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    email: Yup.string().email("El correo electrónico no es válido").required("El correo electrónico es requerido"),
    password: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("La contraseña es requerida"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Las contraseñas no coinciden").required("Debes confirmar tu contraseña"),
    address: Yup.string().required("La dirección es requerida"),
    phone: Yup.string().matches(/^\d{10}$/, "El número de teléfono debe tener 10 dígitos").required("El número de teléfono es requerido"),
})