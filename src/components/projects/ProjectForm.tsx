import { FieldErrors, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

type ProjectFormProps = {
  register: UseFormRegister<{
    projectName: string,
    description: string,
    clientName: string,
    category: string,
    startDate: string,
    endDate: string,
    folderProject: string,
  }>,
  errors: FieldErrors<{
    projectName: string,
    description: string,
    clientName: string,
    category: string,
    startDate: string,
    endDate: string,
    folderProject: string,
  }>
}

export default function ProjectForm({ register, errors }: ProjectFormProps) {
  return (
    <>
      <div className="mb-5 grid grid-cols-2 gap-4">
        <div>
          <label
            className="text-gray-700 capitalize font-bold text-sm"
            htmlFor="projectName"
          >
            Nombre del Proyecto
          </label>
          <input
            className="border-1 border-gray-400 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            type="text"
            id="projectName"
            placeholder="Nombre del Proyecto"
            {...register("projectName", {
              required: "El nombre del proyecto es obligatorio",
            })}
          />
          {errors.projectName && (
            <ErrorMessage>{errors.projectName.message}</ErrorMessage>
          )}
        </div>
        <div>
          <label
            className="text-gray-700 capitalize font-bold text-sm"
            htmlFor="manager"
          >
            Lider del Proyecto
          </label>
          <input
            className="border-1 border-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            disabled
            type="text"
            id="manager"
            placeholder="Lider del Proyecto"
          />
        </div>
      </div>
      <div className="mb-5 grid grid-cols-2 gap-4">
        <div>
          <label
            className="text-gray-700 capitalize font-bold text-sm"
            htmlFor="clientName"
          >
            Cliente
          </label>
          <input
            className="border-1 border-gray-400 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            type="text"
            id="clientName"
            placeholder="Cliente del Proyecto"
            {...register("clientName", {
              required: "El cliente del proyecto es obligatorio",
            })}
          />
          {errors.clientName && (
            <ErrorMessage>{errors.clientName.message}</ErrorMessage>
          )}
        </div>
        <div>
          <label
            className="text-gray-700 capitalize font-bold text-sm"
            htmlFor="category"
          >
            Categoría del Proyecto
          </label>
          <select
            className="border-1 border-gray-300 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            id="category"
            {...register("category", {
              required: "La categoría del proyecto es obligatorio",
            })}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          {errors.category && (
            <ErrorMessage>{errors.category.message}</ErrorMessage>
          )}
        </div>
      </div>
      <div className="mb-5 grid grid-cols-2 gap-4">
        <div>
          <label
            className="text-gray-700 capitalize font-bold text-sm"
            htmlFor="startDate"
          >
            Fecha de inicio:
          </label>
          <input
            className="border-1 border-gray-400 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            type="date"
            id="startDate"
            {...register("startDate", {
              required: "La Fecha de inicio del proyecto es obligatorio",
            })}
          />
          {errors.startDate && (
            <ErrorMessage>{errors.startDate.message}</ErrorMessage>
          )}
        </div>
        <div>
          <label
            className="text-gray-700 capitalize font-bold text-sm"
            htmlFor="endDate"
          >
            Fecha de finalización:
          </label>
          <input
            className="border-1 border-gray-400 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            type="date"
            id="endDate"
            {...register("endDate", {
              required: "La Fecha de finalización del proyecto es obligatorio",
            })}
          />
          {errors.endDate && (
            <ErrorMessage>{errors.endDate.message}</ErrorMessage>
          )}
        </div>
      </div>
      <div className="mb-5 grid grid-cols-1 gap-4">
        <div>
          <label
            className="text-gray-700 capitalize font-bold text-sm"
            htmlFor="folderProject"
          >
            Carpeta del Proyecto
          </label>
          <input
            className="border-1 border-gray-400 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            type="text"
            id="folderProject"
            placeholder="URL de la carpeta del Proyecto"
            {...register("folderProject", {
              required: "La carpeta del proyecto es obligatorio",
            })}
          />
          {errors.folderProject && (
            <ErrorMessage>{errors.folderProject.message}</ErrorMessage>
          )}
        </div>
      </div>
      <div className="mb-5 grid grid-cols-1 gap-4">
        <div>
          <label
            className="text-gray-700 capitalize font-bold text-sm"
            htmlFor="description"
          >
            Descripción del Proyecto
          </label>
          <textarea
            className="border-1 border-gray-400 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
            id="description"
            placeholder="URL de la carpeta del Proyecto"
            {...register("description", {
              required: "La descripción del proyecto es obligatorio",
            })}
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </div>
      </div>
    </>
  );
}
