import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TaskForm from "./TaskForm";
import { useForm } from "react-hook-form";
import { TaskFormData } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { createTask } from "@/api/TaskAPI";
import { toast } from "react-toastify";

export default function AddTaskModal() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const modalTask = queryParams.get("newTask");
  const show = modalTask ? true : false;
  const navigate = useNavigate();

  const initialValues: TaskFormData = {
    taskName: "",
    taskDescription: "",
    startDate: "",
    endDate: "",
    folderProject: "",
  };

  const params = useParams()
  const projectId = params.projectId!
  

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });


  const {mutate} = useMutation({
    mutationFn: createTask,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) =>{
      toast.success(data)
      reset()
      navigate(location.pathname, { replace: true })
    }
  })

  const handleCreateTask = (formData: TaskFormData) => {
    const data = {
      formData,
      projectId
    }
    mutate(data)

  }

  return (
    <>
      <Transition appear show={show} as={Fragment}>
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
                    Crear Tarea
                  </Dialog.Title>

                  <p className="text-xl font-bold">
                    Llena el formulario y crea {""}
                    <span className="text-blue-600">una tarea</span>
                  </p>

                  <form className="py-10 px-5 w-full h-full" noValidate onSubmit={handleSubmit(handleCreateTask)}>
                    <TaskForm register={register} errors={errors} />

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
                        value="Crear Tarea"
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
    </>
  );
}
