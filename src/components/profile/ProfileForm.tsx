import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { Profile, UserProfileForm } from "@/types/index";

type ProfileFormProps = {
  data: Profile;
};

export default function ProfileForm({ data }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: data });

  const handleEditProfile = (formData: UserProfileForm) => {
    console.log(formData);
  };

  return (
    <>
      <div className="mx-auto max-w-3xl g">
        <h1 className="text-5xl font-black ">Mi Perfil</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Aquí puedes actualizar tu información
        </p>

        <form
          onSubmit={handleSubmit(handleEditProfile)}
          className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="name">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              placeholder="Tu Nombre"
              className="w-full p-3  border border-gray-200"
              {...register("name", {
                required: "Nombre de usuario es obligatoro",
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>

          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="lastName">
              Apellido
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Tu Apellido"
              className="w-full p-3  border border-gray-200"
              {...register("lastName", {
                required: "Apellido de usuario es obligatoro",
              })}
            />
            {errors.lastName && <ErrorMessage>{errors.lastName.message}</ErrorMessage>}
          </div>

                    <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="phone">
              Teléfono
            </label>
            <input
              id="phone"
              type="numeric"
              placeholder="Tu Teléfono"
              className="w-full p-3  border border-gray-200"
              {...register("phone", {
                required: "Teléfono de usuario es obligatoro",
              })}
            />
            {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}
          </div>

          <input
            type="submit"
            value="Guardar Cambios"
            className="bg-bg-second w-full p-3 text-white uppercase font-bold hover:bg-blue-800 cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
}
