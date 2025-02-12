import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import correo from "../../../public/email.png";
import whatsapp from "../../../public/whatsapp.png";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTask, getTaskById } from "@/api/TaskAPI";
import { toast } from "react-toastify";
import { formatDate } from "@/helpers/formatDate";
import { statusTranslations } from "@/locales/es";

export default function DetailTaskModal() {
    const location = useLocation()
    const queryParams= new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!
    const show = taskId ? true : false

    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId!

    const {data, isError, error} = useQuery({
        queryKey: ["task", taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId,
        retry: false
    })

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
      mutationFn: deleteTask,
      onError: (error) => {
          toast.error(error.message)
      },
      onSuccess: (data) => {
          queryClient.invalidateQueries({queryKey:["project",projectId]})
          toast.success(data)
          navigate(location.pathname, { replace: true })
      }
  })

  const statusStyles : {[key: string]: string} = {
    pending: 'bg-status-pending',
    onHold: 'bg-status-onHold',
    inProgress: 'bg-status-progress',
    underReview: 'bg-status-review',
    completed: 'bg-status-complete',
  }


    if(isError) {
        toast.error(error.message, {toastId: 'error'});
        return <Navigate to={`/projects/${projectId}`}/>
    }

  if(data) return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname,{replace:true})}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  <p className="text-sm text-slate-400">Agregada el: {formatDate(data.createdAt)}</p>
                  <p className="text-sm text-slate-400">
                    Última actualización:{" "} {formatDate(data.updatedAt)}
                  </p>
                  <Dialog.Title
                    as="h3"
                    className="font-black text-slate-600 my-5"
                  >
                    {" "}
                    <div className="flex justify-between mb-10">
                      <h1 className="text-3xl">
                        <b>Tarea:</b> {data.taskName}
                      </h1>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={()=> navigate(location.pathname+ `?editTask=${taskId}`)}
                          className="bg-sky-500 py-2 px-4 rounded-lg text-white hover:bg-sky-700 font-bold cursor-pointer"
                        >
                          Editar tarea
                        </button>
                        <button onClick={() => mutate({projectId, taskId})} className="border-2 border-red-500 text-red-500  py-2 px-4 rounded-lg  hover:bg-red-500 hover:text-white font-bold cursor-pointer">
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </Dialog.Title>

                  <div className="bg-white w-full">
                    <div className="flex items-center mb-5">
                      <b className="mr-5">Estado:</b><p className={`text-white p-2 pl-5 pr-5 rounded-2xl ${statusStyles[data.status]}`}> {statusTranslations[data.status]}</p> 
                      
                    </div>
                    <div className="mb-5">
                      <b>Decripción:</b> {data.taskDescription}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div>
                        <b>Fecha de inicio: </b> {formatDate(data.startDate)}
                        {}
                      </div>
                      <div>
                        <b>Fecha de finalización: </b> {formatDate(data.endDate)}
                        {}
                      </div>
                    </div>
                    <div>
                      <b>Link recursos de la tarea:</b> {data.folderProject}
                    </div>
                    <div className="flex justify-end mb-5">
                      <div className="flex items-center gap-2 text-gray-500 hover:text-black">
                        <b>Compartir:</b>
                        <Link to="/">
                          <img src={whatsapp} />
                        </Link>
                        <Link to="/">
                          <img src={correo} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
