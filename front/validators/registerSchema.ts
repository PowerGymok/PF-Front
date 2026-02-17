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
    name: Yup.string().trim().matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo letras").min(2).max(50).required("Campo obligatorio"),
    email: Yup.string().email("Correo electrónico inválido").required("Campo obligatorio"),
    password: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("La contraseña es requerida"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Las contraseñas no coinciden").required("Debes confirmar tu contraseña"),
    address: Yup.string().required("La dirección es requerida"),
    phone: Yup.string().trim().matches(/^[0-9+\-\s()]+$/, "El teléfono debe tener caracteres válidos").min(8, "Muy corto").max(15, "Muy largo").required("Campo obligatorio")
})