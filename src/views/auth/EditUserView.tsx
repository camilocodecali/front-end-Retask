import { getUserById } from "@/api/AuthAPI"
import Spinner from "@/components/Spinner"
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

  if(isLoading) return <Spinner/>
  if(isError) return <Navigate to='/404'/>

  if(data) return <EditUserForm user={data} userId={userId}/>

}

export default EditUserView
