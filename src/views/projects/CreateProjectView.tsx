import ProjectForm from "@/components/projects/ProjectForm";
import {useForm} from "react-hook-form"


export default function CreateProjectView() {

  const initialValues = {
    projectName: "",
    description: "",
    clientName: "",
    category: "",
    startDate: "",
    endDate: "",
    folderProject: "",
  }

  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

  const handleForm = (data) => {
    console.log(data);
    
  }

  return (
    <>
    <div className="grid grid-cols-2 gap-4">
      <h1 className="text-3xl text-gray-800">Crear Proyectos</h1>
      <div className="flex justify-end">
      <button className="bg-gray-700 hover:bg-gray-500 text-white px-10 py-2 rounded-lg cursor-pointer transition-colors">Volver</button>
      </div>
      
    </div>
      
      <div className="mt-10 justify-center bg-white shadow py-10 px-5 w-full h-full rounded-lg">
      <form onSubmit={handleSubmit(handleForm)} noValidate className=""><ProjectForm register={register} errors={errors}/>
      <div className="flex justify-end gap-4">
            <button className="border-gray-300 border-2 rounded-lg px-10 py-2 cursor-pointer">Cancelar</button>
            <input className="bg-green-600 hover:bg-green-700 px-10 py-2 capitalize fond-bold text-white rounded-lg cursor-pointer transition-colors" type="submit" value='Crear Proyecto'/>
      </div>
      </form>

      </div>

    </>
  )
}
