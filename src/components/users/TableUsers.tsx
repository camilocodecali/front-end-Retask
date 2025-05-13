import { confirmAccount, deleteUser } from "@/api/AuthAPI";
import { UserTableData } from "@/types/index";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type UserTableProps = {
    user: UserTableData
}

export default function TableUsers({ user }: UserTableProps) {
    const queryClient = useQueryClient()
    const {mutate: mutateConfirmUser} = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey:["users"]})
        }
    })

    const {mutate: mutateDeleteUser} = useMutation({
      mutationFn: deleteUser,
      onError: (error) => {
        toast.error(error.message)
      },
      onSuccess: (data)=> {
        toast.success(data)
        queryClient.invalidateQueries({queryKey:["users"]})
      }
    })


    const handleConfirmUser = (formData: string)=> {
        const data = {
            email: formData
        }
        mutateConfirmUser(data)
    }

    const handleDeleteUser = (id: string)=>{
      mutateDeleteUser(id)
    }


  return (
    <tr>
      <td className=" p-10">{user.name} {user.lastName}</td>
      <td className=" p-10">{user.identification}</td>
      <td className=" p-10">{user.email}</td>
      <td className=" p-10">{user.phone}</td>
      <td className=" p-10">{user.position}</td>
      <td className='p-10 flex items-center'><p className={`p-5 text-white text-center rounded-xl ${user.confirmed ? 'bg-green-700' : 'bg-red-800'}`}>{user.confirmed ? 'Activo' : 'Inactivo'}</p></td>
      <td className=" p-10">
      <Menu>
      <MenuButton className="px-3 py-2 bg-success rounded-lg hover:bg-success-hover text-white font-bold cursor-p">Acciones</MenuButton>
      <MenuItems className="bg-white p-5 rounded-2xl shadow-2xl" anchor="bottom">
        <MenuItem>
          <Link className="py-1 border-b-1 border-gray-300 block cursor-pointer data-[focus]:bg-blue-100" to={``}>
            Ver Usuario
          </Link>
        </MenuItem>
        <MenuItem>
          <button className="py-1 border-b-1 border-gray-300 block cursor-pointer text-left data-[focus]:bg-blue-100" onClick={()=>handleConfirmUser(user.email)}>
            {user.confirmed ? 'Desactivar usuario' : 'Activar usuario'}
          </button>
        </MenuItem>
        <MenuItem>
          <Link className="py-1 border-b-1 border-gray-300 block cursor-pointer data-[focus]:bg-blue-100" to={`/users/${user._id}/edit`}>
            Editar Usuario
          </Link>
        </MenuItem>
        <MenuItem>
          <button className="py-1 border-b-1 border-gray-300 block cursor-pointer text-left data-[focus]:bg-blue-100" onClick={()=> handleDeleteUser(user._id)}>
            Eliminar Usuario
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
      </td>
    </tr>
  );
}
