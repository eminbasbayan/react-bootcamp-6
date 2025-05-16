import * as yup from "yup";

export const registerSchema = yup.object({
  firstName: yup.string().required("Ad zorunludur"),
  lastName: yup.string().required("Soyad zorunludur"),
  email: yup
    .string()
    .email("Geçerli bir e-posta girin")
    .required("E-posta zorunludur"),
  password: yup
    .string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .required("Şifre zorunludur"),
});
