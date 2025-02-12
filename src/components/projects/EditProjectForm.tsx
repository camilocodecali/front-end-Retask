import { Project, ProjectFormData } from "@/types/index";
import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type ProjectEditProps = {
    project : ProjectFormData,
    projectId: Project['_id']
}

export default function EditProjectForm({project, projectId}: ProjectEditProps) {

    const navigate = useNavigate()
    const { register, handleSubmit, formState:{errors}} = useForm({defaultValues:{
        projectName: project.projectName,
        clientName: project.clientName,
        description: project.description,
        category: project.category,
        startDate: project.startDate,
        endDate: project.endDate,
        folderProject: project.folderProject
    }

    })

    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey:['projects']})
            queryClient.invalidateQueries({queryKey:["editProject",projectId]})
            toast.success(data)
            navigate('/projects')
        }
    }) 


    const handleForm = (formData: ProjectFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
    } 
    
  return (
    <>
    <div className="grid grid-cols-2 gap-4">
      <h1 className="text-3xl text-gray-800">Editar Proyectos</h1>
      <div className="flex justify-end">
      <Link to={`/projects/${projectId}`} className="bg-back hover:bg-back-hover text-white px-10 py-2 rounded-lg cursor-pointer transition-colors">Volver</Link>
      </div>
    </div>
      <div className="mt-10 justify-center bg-white shadow py-10 px-5 w-full h-full rounded-lg">
      <form onSubmit={handleSubmit(handleForm)} noValidate className=""><ProjectForm register={register} errors={errors}/>
      <div className="flex justify-end gap-4">
            <button className="border-gray-300 border-2 rounded-lg px-10 py-2 cursor-pointer">Cancelar</button>
            <input className="bg-green-600 hover:bg-green-700 px-10 py-2 capitalize fond-bold text-white rounded-lg cursor-pointer transition-colors" type="submit" value='Editar Proyecto'/>
      </div>
      </form>
      </div>
    </>
  )
}
