import { addUserToProject } from "@/api/TeamAPI";
import { TeamMember } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SearchResultProps = {
    user: TeamMember
    reset: () => void
}

export default function SearchResult({user, reset}: SearchResultProps) {
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!
    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate(location.pathname, { replace: true })
            queryClient.invalidateQueries({queryKey: ["projectTeam",projectId]

})
        }
    })

    const handleAddUserToProject = () => {
        const data  = {projectId, id: user._id}
        mutate(data)
    }
    
  return (
    <>
      <p className="mt-10 text-center font-bold py-5">Resultado</p>
      <div className="flex justify-between items-center bg-gray-100 p-5 rounded-xl">
        <p>{user.name}</p>
        <button
            onClick={handleAddUserToProject}
            className="text-bg-second border-bg-second border-2 hover:bg-blue-900 hover:text-white rounded-xl px-10 py-3 font-bold cursor-pointer"
        >Agregar al Proyecto</button>
      </div>
    </>
  )
}
