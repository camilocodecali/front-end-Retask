import { TeamMember } from "@/types/index";

type SearchResultProps = {
    user: TeamMember
}

export default function SearchResult({user}: SearchResultProps) {
    console.log(user);
    
  return (
    <>
      <p className="mt-10 text-center font-bold">Resultado</p>
      <div className="flex justify-between items-center">
        <p>{user.name}</p>
        <button
            className="text-bg-second hover:bg-blue-900 px-10 py-3 font-bold cursor-pointer"
        >Agregar al Proyecto</button>
      </div>
    </>
  )
}
