import { deleteTask } from "@/api/TaskAPI"
import { formatDate } from "@/helpers/formatDate"
import { TaskProject } from "@/types/index"
import { Menu, Transition } from "@headlessui/react"
import {EllipsisVerticalIcon} from '@heroicons/react/20/solid'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Fragment } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type TaskCardProps = {
    task: TaskProject
}

export default function TaskCard({task}: TaskCardProps) {


    const navigate = useNavigate()
    const location = useLocation()

    const queryClient = useQueryClient()
    const params = useParams()
    const projectId = params.projectId!

    const {mutate} = useMutation({
        mutationFn: deleteTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey:["project",projectId]})
            toast.success(data)
        }
    })

  return (
    <li className="p-5 bg-white flex justify-between gap-3 shadow rounded-xl">
        <div className="min-w-0 flex flex-col gap-y-4">
            <button type="button" className="text-xl font-bold text-slate-600 text-left">{task.taskName}</button>
            <p>{task.taskDescription}</p>
            <div>
            <b>Fecha de entrega:</b><span> {formatDate(task.endDate)}</span>
            </div>
            
        </div>
        <div className="flex shrink-0  gap-x-6">
    <Menu as="div" className="relative flex-none">
        <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
            <span className="sr-only">opciones</span>
            <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
        </Menu.Button>
        <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
            <Menu.Items
                className="absolute right-0 z-10 mt-2 w-46 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <Menu.Item>
                    <button onClick={()=> navigate(location.pathname+ `?viewTask=${task._id}`)} type='button' className='block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer'>
                        Ver Tarea
                    </button>
                </Menu.Item>
                <Menu.Item>
                    <button onClick={()=> navigate(location.pathname+ `?editTask=${task._id}`)} type='button' className='block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer' >
                        Editar Tarea
                    </button>
                </Menu.Item>

                <Menu.Item>
                    <button onClick={() => mutate({projectId, taskId: task._id})} type='button' className='block px-3 py-1 text-sm leading-6 text-red-500 cursor-pointer'>
                        Eliminar Tarea
                    </button>
                </Menu.Item>
            </Menu.Items>
        </Transition>
    </Menu>
</div>
    </li>
  )
}
