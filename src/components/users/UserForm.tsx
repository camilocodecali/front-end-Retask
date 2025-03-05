import { positionTranslation } from "@/locales/es";
import { UserRegistrationForm } from "@/types/index";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

type UserFormProps = {
  register: UseFormRegister<UserRegistrationForm>;
  errors: FieldErrors<UserRegistrationForm>;
  watch: UseFormWatch<UserRegistrationForm>;
};

function UserForm({ register, errors, watch }: UserFormProps) {
  const password = watch("password");

  return (
    <>
      <div className="mb-5 grid grid-cols-2 gap-4">
        <div>
          <label
            className="text-gray-700 capitalize font-bold text-sm"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            id="name"
            type="text"
            className="border-1 border-gray-400 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            placeholder="Nombre del Usuario"
            {...register("name", {
              required: "El Nombre de usuario es obligatorio",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div>
          <label
            className="text-gray-700 capitalize font-bold text-sm"
            htmlFor="lastName"
          >
            Apellido
          </label>
          <input
            id="lastName"
            type="text"
            className="border-1 border-gray-400 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            placeholder="Apellido del Usuario"
            {...register("lastName", {
              required: "El Apellido de usuario es obligatorio",
            })}
          />
          {errors.lastName && (
            <ErrorMessage>{errors.lastName.message}</ErrorMessage>
          )}
        </div>

      </div>
      <div className="mb-5 grid grid-cols-2 gap-4">
      <div>
          <label
            className="text-gray-700 capitalize font-bold text-sm"
            htmlFor="identification"
          >
            Identificación
          </label>
          <input
            id="identification"
            type="number"
            className="border-1 border-gray-400 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            placeholder="Número de identificación"
            {...register("identification", {
              required: "La identificación de usuario es obligatorio",
            })}
          />
          {errors.identification && (
            <ErrorMessage>{errors.identification.message}</ErrorMessage>
          )}
        </div>
        <div>
          <label
            className="text-gray-700 capitalize font-bold text-sm"
            htmlFor="email"
          >
            Correo
          </label>
          <input
            id="email"
            type="email"
            className="border-1 border-gray-400 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            placeholder="Ingrese el Email"
            {...register("email", {
              required: "El correo del usuario es obligatorio",
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

      </div>
      <div className="mb-5 grid grid-cols-2 gap-4">
      <div>
          <label
            className="text-gray-700 capitalize font-bold text-sm"
            htmlFor="phone"
          >
            Teléfono
          </label>
          <input
            id="phone"
            type="number"
            className="border-1 border-gray-400 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            placeholder="Teléfono de la empresa"
            {...register("phone", {
              required: "El teléfono del usuario es obligatorio",
            })}
          />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
        </div>
        <div>
          <label
            className="text-gray-700 capitalize font-bold text-sm"
            htmlFor="position"
          >
            Cargo
          </label>
          <select
            id="position"
            className="border-1 border-gray-400 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            {...register("position")}
          >
            <option className="text-gray-800" value="">
              --Seleccionar--
            </option>
            {Object.entries(positionTranslation).map(([key, value]) => (
              <option className="text-gray-800" key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
          {errors.position && (
            <ErrorMessage>{errors.position.message}</ErrorMessage>
          )}
        </div>
      </div>
      <div className="mb-5 grid grid-cols-2 gap-4">
        <div>
          <label
            className="text-gray-700 capitalize font-bold text-sm"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de registro"
            className="border-1 border-gray-400 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            {...register("password", {
              required: "El Password es obligatorio",
              minLength: {
                value: 8,
                message: "El Password debe ser mínimo de 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <div>
          <label
            className="text-gray-700 capitalize font-bold text-sm"
            htmlFor="password_confirmation"
          >
            Repetir Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite la Password"
            className="border-1 border-gray-400 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: (value) =>
                value === password || "Los Passwords no son iguales",
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>
      </div>
    </>
  );
}

export default UserForm;
