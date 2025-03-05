import ErrorMessage from "@/components/ErrorMessage";
import { UserLoginForm } from "@/types/index";
import { useForm } from "react-hook-form";

function LoginView() {
  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleLogin = (formData: UserLoginForm) => console.log(formData);
  
  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)} className="my-5 shadow rounded-lg p-10 bg-white">
        <div className="my-5">
          <label htmlFor="email" className="capitalize block text-xl">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-transparent"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido"
              }
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="my-5">
          <label htmlFor="password" className="capitalize block text-xl">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password de registro"
            className="w-full mt-3 p-3 border rounded-xl bg-transparent"
            {...register("password", {
              required: "El Password es obligatorio"
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>
        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-bg-second text-white mb-5 w-full py-3 capitalize rounded-lg hover:cursor-pointer hover:bg-blue-800 transition-colors"
        />
      </form>
    </>
  );
}

export default LoginView;
