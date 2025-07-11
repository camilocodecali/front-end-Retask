import { formatDate } from "@/helpers/formatDate"
import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types/index"
import { useMemo } from "react"
import Spinner from "../Spinner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteNote } from "@/api/NoteAPI"
import { toast } from "react-toastify"
import { useLocation, useParams } from "react-router-dom"

type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({note}: NoteDetailProps) {
    const {data, isLoading} = useAuth()
    const canDelete = useMemo(()=> data?._id === note.createdBy._id , [data])
    const params = useParams()

      const location = useLocation();
      const queryParams = new URLSearchParams(location.search);
      const queryClient = useQueryClient()

      const projectId = params.projectId!
      const taskId = queryParams.get("viewTask")!;

    const {mutate} = useMutation({
        mutationFn: deleteNote,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey:['task', taskId]})
            toast.success(data)
        }
    })

    if (isLoading) return <Spinner/>
  return (
    <div className="p-3 flex justify-between items-center">
      <div>
        <p>
            {note.content} por: <span className="font-bold">{note.createdBy.name}</span>
        </p>
        <p className="text-xs text-slate-500">
            {formatDate(note.createdAt)}
        </p>
      </div>
      {canDelete && (
        <button
         onClick={()=>mutate({projectId, taskId, noteId: note._id})}
         className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors rounded-xl"
        >Eliminar</button>
      )}
    </div>
  )
}
