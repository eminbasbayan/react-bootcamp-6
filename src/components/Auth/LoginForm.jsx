import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup
    .string()
    .email("Geçerli bir e-posta girin")
    .required("E-posta zorunlu"),
  password: yup
    .string()
    .min(6, "Şifre en az 6 karakter olmalı")
    .required("Şifre zorunlu"),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log("form verisi:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Giriş Yap
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-posta
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email")}
              placeholder="example@mail.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500 font-bold">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Şifre
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password")}
              placeholder="Şifrenizi girin"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500 font-bold">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2" />
              Beni hatırla
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Şifremi unuttum
            </a>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Giriş Yap
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Hesabınız yok mu?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Kayıt ol
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
