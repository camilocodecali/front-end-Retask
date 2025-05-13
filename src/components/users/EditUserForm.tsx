import { User, UserRegistrationForm } from "@/types/index";
import { Link, useNavigate } from "react-router-dom";
import UserForm from "./UserForm";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/api/AuthAPI";
import { toast } from "react-toastify";

type UserEditProps = {
  user: UserRegistrationForm,
  userId: User['_id']
}

export default function EditUserForm({user, userId}: UserEditProps) {
  const navigate = useNavigate()
  const {register, watch, handleSubmit, formState:{errors}} = useForm({defaultValues:{
    email: user.email,
    password: "",
    password_confirmation: "",
    name: user.name,
    lastName: user.lastName,
    identification: user.identification,
    phone: user.phone,
    position: user.position
  }})

  const queryClient = useQueryClient()
  const {mutate} = useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey:['users']})
      queryClient.invalidateQueries({queryKey:['user']})
      toast.success(data)
      navigate('/users')
    }
  })

  const handleForm = (formData: UserRegistrationForm) => {
    const data = {
      formData,
      userId
    }
    mutate(data)
  }
  
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <h1 className="text-3xl text-gray-800">Editar Usuario</h1>
        <div className="flex justify-end">
          <Link
            to={`/users/${userId}`}
            className="bg-back hover:bg-back-hover text-white px-10 py-2 rounded-lg cursor-pointer transition-colors"
          >
            Volver
          </Link>
        </div>
      </div>
      <div className="mt-10 justify-center bg-white shadow py-10 px-5 w-full rounded-lg">
        <form onSubmit={handleSubmit(handleForm)}>
          <UserForm register={register} watch={watch} errors={errors}/>
          <div className="flex justify-end gap-4">
            <button className="border-gray-300 border-2 rounded-lg px-10 py-2 cursor-pointer">
              Cancelar
            </button>
            <input
              className="bg-green-600 hover:bg-green-700 px-10 py-2 capitalize fond-bold text-white rounded-lg cursor-pointer transition-colors"
              type="submit"
              value="Actualizar Usuario"
            />
          </div>
        </form>
      </div>
    </>
  )
}
