import * as Yup from "yup";

export interface MembershipSchema {
  name: string;
  description?: string;
  price: number;
  durationDays?: number;
  includesSpecialClasses?: boolean;
  includesCoachChat?: boolean;
  discountPercentage?: number;
}

// Respuesta del backend — extiende el schema con campos que genera el servidor
export interface MembershipResponse extends MembershipSchema {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

// Extiende MembershipResponse con el campo isActive para el endpoint admin
export interface MembershipAdminResponse extends MembershipResponse {
  isActive: boolean;
}

export const MEMBERSHIP_INITIAL: MembershipSchema = {
  name: "",
  price: "" as unknown as number,
  description: "",
  durationDays: undefined,
  includesSpecialClasses: false,
  includesCoachChat: false,
  discountPercentage: undefined,
};

export const MembershipSchemaYup = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  description: Yup.string().notRequired(),
  price: Yup.number()
    .required("El precio es obligatorio")
    .min(0, "No puede ser negativo"),
  durationDays: Yup.number().min(0, "Debe ser positivo").notRequired(),
  includesSpecialClasses: Yup.boolean().default(false),
  includesCoachChat: Yup.boolean().default(false),
  discountPercentage: Yup.number()
    .min(0, "No puede ser menor a 0")
    .max(100, "No puede ser mayor a 100")
    .notRequired(),
});
