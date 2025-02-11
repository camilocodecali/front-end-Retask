import { TaskFormData } from "@/types/index"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"

type TaskFormProps = {
  register: UseFormRegister<TaskFormData>
  errors: FieldErrors<TaskFormData>
}

export default function TaskForm({register, errors}: TaskFormProps) {
  return (
    <>
                        <div className="mb-5 grid grid-cols-1 gap-4">
                      <div>
                        <label
                          className="text-gray-700 capitalize font-bold text-sm"
                          htmlFor="taskName"
                        >
                          Título
                        </label>
                        <input
                          id="taskName"
                          type="text"
                          className="border-1 border-slate-500 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                          placeholder="Título de la tarea"
                          {...register('taskName', {required: 'El nombre de la tarea es obligatorio'})}
                        />
                        {errors.taskName && (<ErrorMessage>{errors.taskName.message}</ErrorMessage>)}
                      </div>
                    </div>
                    <div className="mb-5 grid grid-cols-2 gap-4">
                      <div>
                        <label
                          className="text-gray-700 capitalize font-bold text-sm"
                          htmlFor="startDate"
                        >
                          Fecha de inicio
                        </label>
                        <input
                          id="startDate"
                          type="date"
                          className="border-1 border-slate-500 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                          {...register('startDate', {required: 'La fecha de inicio de la tarea es obligatoria'})}
                        />
                        {errors.startDate && (<ErrorMessage>{errors.startDate.message}</ErrorMessage>)}
                      </div>
                      <div>
                        <label
                          className="text-gray-700 capitalize font-bold text-sm"
                          htmlFor="endDate"
                        >
                          Fecha Entrega
                        </label>
                        <input
                          id="endDate"
                          type="date"
                          className="border-1 border-slate-500 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                          {...register('endDate', {required: 'La fecha de entrega de la tarea es obligatoria'})}
                        />
                        {errors.endDate && (<ErrorMessage>{errors.endDate.message}</ErrorMessage>)}
                      </div>
                    </div>
                    <div className="mb-5 grid grid-cols-1 gap-4">
                      <div>
                        <label
                          className="text-gray-700 capitalize font-bold text-sm"
                          htmlFor="folderProject"
                        >
                          Link recursos de la tarea
                        </label>
                        <input
                          id="folderProject"
                          type="text"
                          className="border-1 border-slate-500 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                          placeholder="Pegue aquí el de recursos"
                          {...register('folderProject', {required: 'La carpeta de la tarea es obligatoria'})}

                        />
                        {errors.folderProject && (<ErrorMessage>{errors.folderProject.message}</ErrorMessage>)}
                      </div>
                    </div>

                    <div className="mb-5">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="taskDescription"
                      >
                        Descripción
                      </label>
                      <textarea
                        id="taskDescription"
                        className="border-1 border-slate-500 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Descripción del Proyecto"
                        {...register('taskDescription', {required: 'La descripción de la tarea es obligatoria'})}
                      />
                      {errors.taskDescription && (<ErrorMessage>{errors.taskDescription.message}</ErrorMessage>)}
                    </div>
    </>
  )
}
