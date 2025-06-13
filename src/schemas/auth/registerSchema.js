import * as yup from "yup";

export const registerSchema = yup.object({
  fullName: yup
    .string()
    .min(2, "Ad soyad en az 2 karakter olmalıdır")
    .required("Ad soyad zorunludur"),
  email: yup
    .string()
    .email("Geçerli bir e-posta girin")
    .required("E-posta zorunludur"),
  phone: yup
    .string()
    .matches(/^[0-9]{10,11}$/, "Geçerli bir telefon numarası girin")
    .required("Telefon numarası zorunludur"),
  password: yup
    .string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .matches(/(?=.*[a-z])/, "Şifre en az bir küçük harf içermelidir")
    .matches(/(?=.*[A-Z])/, "Şifre en az bir büyük harf içermelidir")
    .matches(/(?=.*\d)/, "Şifre en az bir rakam içermelidir")
    .required("Şifre zorunludur"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Şifreler eşleşmiyor")
    .required("Şifre tekrarı zorunludur"),
  terms: yup
    .boolean()
    .oneOf([true], "Kullanım şartlarını kabul etmelisiniz")
    .required("Kullanım şartlarını kabul etmelisiniz")
});
