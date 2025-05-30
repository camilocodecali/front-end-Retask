import { getProjectTeam, removeUserFromProject } from "@/api/TeamAPI";
import Spinner from "@/components/Spinner";
import AddMemberModal from "@/components/team/AddMemberModal";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react";
import { toast } from "react-toastify";

export default function ProjectTeamView() {
  const navigate = useNavigate();
  const location = useLocation()
  const params = useParams()
  const projectId = params.projectId!
  const queryClient = useQueryClient()

  const {data, isLoading, isError} = useQuery({
    queryKey: ['projectTeam', projectId],
    queryFn: () => getProjectTeam(projectId),
    retry: false
  })

  const {mutate} = useMutation({
    mutationFn: removeUserFromProject,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ["projectTeam","68367b403e7f0477ec588c7d"]})
    }
  })
  
  if(isLoading) return <Spinner/>
  if(isError) return <Navigate to={'/404'}/>

  if (data) return (
    <div className="w-full grid grid-col-1">
      <div className="flex justify-end">
        <Link
          to={`/projects/${projectId}`}
          className="bg-back hover:bg-back-hover text-white px-10 py-2 rounded-lg cursor-pointer transition-colors"
        >
          Volver al proyecto
        </Link>
      </div>
      <div className="mb-5 mt-10 grid md:grid-cols-2 items-center bg-white p-10 rounded-xl shadow-md">
        <div>
          <h1 className="text-4xl">Administrar Responsables</h1>
          <p className="text-2xl font-light text-gray-500 mt-5">
            Administra el equipo de trabajo para este proyecto
          </p>
        </div>
        <button
         onClick={()=> navigate(location.pathname + '?addMember=true')}
         className="bg-success hover:bg-success-hover text-white text-lg font-bold py-2 mt-5 md:mt-0 px-8 rounded-lg shadow-lg text-center cursor-pointer">
          + Agregar responsables
        </button>
      </div>

            <h2 className="text-4xl mt-5">Miembros actuales</h2>
            {data.length ? (
                <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg">
                    {data?.map((member) => (
                        <li key={member._id} className="flex justify-between gap-x-6 px-5 py-10">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <p className="text-2xl font-black text-gray-600">
                                        {member.name} {member.lastName}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                       {member.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-x-6">
                                <Menu as="div" className="relative flex-none">
                                    <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                            <span className="sr-only">opciones</span>
                                            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                    </MenuButton>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <MenuItems className="cursor-pointer absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            <MenuItem>
                                                <button
                                                    type='button'
                                                    className='block px-3 py-1 text-sm leading-6 text-red-500 cursor-pointer'
                                                    onClick={()=> mutate({projectId, id: member._id})}
                                                >
                                                    Eliminar del Proyecto
                                                </button>
                                            </MenuItem>
                                        </MenuItems>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-center py-20'>No hay miembros en este equipo</p>
            )}



      <AddMemberModal/>
    </div>
  );
}
