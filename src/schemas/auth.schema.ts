import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "Nombre de usuario requerido",
    })
    .min(4, {
      message: "El nombre de usuario debe tener al menos 4 caracteres.",
    }),
  email: z
    .string({
      required_error: "Correo electrónico requerido.",
    })
    .email({
      message: "Correo electrónico invalido.",
    }),
  password: z
    .string({
      required_error: "Contraseña requerida.",
    })
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres.",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Correo electrónico requerido.",
    })
    .email({
      message: "Correo electrónico invalido.",
    }),
  password: z
    .string({
      required_error: "Contraseña requerida.",
    })
    .min(8, {
      message: "La contraseña debe tener al menos 8 caracteres.",
    }),
});
