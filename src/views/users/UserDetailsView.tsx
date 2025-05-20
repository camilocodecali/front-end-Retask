import { getUserById } from "@/api/AuthAPI";
import UserCard from "@/components/users/UserCard";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useParams } from "react-router-dom";


export default function UserDetailsView() {
    const params = useParams();
    const userId = params.userId!;
    
    const {data, isLoading, isError} = useQuery({
        queryKey: ["user", userId ],
        queryFn: () => getUserById(userId),
        retry: false
    })
    
    if(isLoading) return 'Cargand...'
    if(isError) return <Navigate to="/404"/>
  if(data) return (
      <div className="w-full grid grid-col-1">
        <div className="flex justify-end">
      <Link to="/users" className="bg-back hover:bg-back-hover text-white px-10 py-2 rounded-lg cursor-pointer transition-colors">Volver</Link>
      </div>
      
        <UserCard user={data}/>
      </div>
  )
}
