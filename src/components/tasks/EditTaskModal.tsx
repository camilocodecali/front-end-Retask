import { Task, TaskFormData } from "@/types/index";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TaskForm from "./TaskForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/api/TaskAPI";
import { toast } from "react-toastify";

type EditTaskModalProps = {
    task: Task,
    taskId: Task['_id']
}

export default function EditTaskModal({task, taskId}: EditTaskModalProps) {
    const navigate = useNavigate()
    const {register, handleSubmit, reset, formState: {errors}} = useForm<TaskFormData>({defaultValues:{
        taskName: task.taskName,
        taskDescription: task.taskDescription,
        startDate: task.startDate,
        endDate: task.endDate,
        folderProject: task.folderProject,
    }
    })
    const location = useLocation()
    const params = useParams()
    const projectId = params.projectId!
    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: updateTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey:["task",taskId]})
            queryClient.invalidateQueries({queryKey:["project","67a542fa800a49d67a235125"]})
            toast.success(data)
            reset()
            navigate(location.pathname,{replace:true})
        }
    })

    const handleEditTask = (formData: TaskFormData) => {
        const data = {
            projectId,
            taskId,
            formData
         }
         mutate(data)
    }
  return (
      <Transition appear show={true} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => navigate(location.pathname, { replace: true })}
        >
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
                  <Dialog.Title as="h3" className="font-black text-4xl  my-5">
                    Editar Tarea
                  </Dialog.Title>

                  <p className="text-xl font-bold">
                    Llena el formulario y actualiza {""}
                    <span className="text-blue-600">una tarea</span>
                  </p>

                  <form className="py-10 px-5 w-full h-full" noValidate onSubmit={handleSubmit(handleEditTask)}>
                    <TaskForm register={register} errors={errors}/>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() =>
                          navigate(location.pathname, { replace: true })
                        }
                        className="border-gray-300 border-2 rounded-lg px-10 py-2"
                      >
                        Cancelar
                      </button>
                      <input
                        type="submit"
                        value="Actualizar Tarea"
                        className="bg-green-600 hover:bg-green-500 px-10 py-2 capitalize font-bold text-white rounded-lg cursor-pointer transition-colors"
                      />
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}
