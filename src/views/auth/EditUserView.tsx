import { getUserById } from "@/api/AuthAPI"
import EditUserForm from "@/components/users/EditUserForm"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"

function EditUserView() {

    const params = useParams()
    const userId = params.userId!
    const {data, isLoading, isError} = useQuery({
      queryKey: ['editUser', userId],
      queryFn: ()=> getUserById(userId),
      retry: false
    })
    console.log(data);

  if(isLoading) return 'Cargando...'
  if(isError) return <Navigate to='/404'/>

  if(data) return <EditUserForm/>

}

export default EditUserView
