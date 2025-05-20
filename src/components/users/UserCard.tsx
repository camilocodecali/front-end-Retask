import { deleteUser } from "@/api/AuthAPI";
import { formatDate } from "@/helpers/formatDate";
import { UserTableData } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type UserCardProps ={
  user: UserTableData
}
export default function UserCard({user}: UserCardProps) {
    const params = useParams();
    const userId = params.userId!;
    const navigate = useNavigate()

    const {mutate} = useMutation({
      mutationFn: deleteUser,
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: (data) => {
        toast.success(data);
        navigate('/users')
      }
    })
  
    return (
    <div className="bg-white w-full shadow mt-10 rounded-lg p-5">
    <div className="md:flex justify-between mb-10 sm:grid sm:grid-cols-1">
      <h1 className="text-3xl">
        <b>Usuario:</b> {user.name}
      </h1>
      <div className="flex items-center md:gap-4 gap-2 md:py-0 py-5">
        <Link
          to={`/users/${user._id}/edit`}
          className="bg-sky-500 py-2 px-4 rounded-lg text-white hover:bg-sky-700 font-bold"
        >
          Editar Usuario
        </Link>
        <button
          className="border-2 border-red-500 text-red-500  py-2 px-4 rounded-lg  hover:bg-red-500 hover:text-white font-bold"
          onClick={()=> mutate(userId)}
        >
          Eliminar
        </button>
      </div>
    </div>
    <div className="flex items-center mb-5">
      <b className="mr-5">Identificación: </b> {user.identification}
    </div>
    <div className="grid grid-cols-2 gap-4 mb-5">
      <div>
        <b>Estado:</b> {user.confirmed ? 'Activo' : 'Inactivo'}
      </div>
      <div>
        <b>Correo: </b> {user.email}
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-5">
      <div>
        <b>Teléfono: </b> {user.phone}
      </div>
      <div>
        <b>Cargo: </b> {user.position}
      </div>
    </div>
    <div className="grid grid-cols-2 gap-4 mb-5">
      <div>
        <b>Fecha de ingreso:</b> {formatDate(user.createdAt)}
      </div>
    </div>

  </div>
  )
}
