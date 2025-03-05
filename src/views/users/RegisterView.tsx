import UserForm from "@/components/users/UserForm";
import { UserRegistrationForm } from "@/types/index";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegisterView() {
  const initialValues = {
    email: '',
    password: '',
    password_confirmation: '',
    name: '',
    lastName: '',
    identification: '',
    phone: '',
    position: undefined
}

const navigate = useNavigate()

const {register, reset, handleSubmit, watch, formState:{errors}} = useForm<UserRegistrationForm>({defaultValues: initialValues})

const {mutate} = useMutation({
  mutationFn: createAccount,
  onError: (error) => {
    toast.error(error.message)
  },
  onSuccess: (data) => {
    toast.success(data)
    reset()
    navigate('/users')
  }
})

const handleRegister = (formData: UserRegistrationForm) => mutate(formData);
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <h1 className="text-3xl text-gray-800">Crear Usuario</h1>
        <div className="flex justify-end">
          <Link
            to="/users"
            className="bg-back hover:bg-back-hover text-white px-10 py-2 rounded-lg cursor-pointer transition-colors"
          >
            Volver
          </Link>
        </div>
      </div>
      <div className="mt-10 justify-center bg-white shadow py-10 px-5 w-full rounded-lg">
        <form onSubmit={handleSubmit(handleRegister)}>
          <UserForm register={register} watch={watch} errors={errors}/>
          <div className="flex justify-end gap-4">
            <button className="border-gray-300 border-2 rounded-lg px-10 py-2 cursor-pointer">
              Cancelar
            </button>
            <input
              className="bg-green-600 hover:bg-green-700 px-10 py-2 capitalize fond-bold text-white rounded-lg cursor-pointer transition-colors"
              type="submit"
              value="Crear Usuario"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default RegisterView;
