import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Geçerli bir e-posta girin")
    .required("E-posta zorunlu"),
  password: yup
    .string()
    .min(6, "Şifre en az 6 karakter olmalı")
    .required("Şifre zorunlu"),
});
