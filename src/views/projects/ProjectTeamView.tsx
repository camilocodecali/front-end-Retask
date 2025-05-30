import AddMemberModal from "@/components/team/AddMemberModal";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

export default function ProjectTeamView() {
  const navigate = useNavigate();
  const location = useLocation()
  const params = useParams()
  const projectId = params.projectId!
  
  return (
    <div className="w-full grid grid-col-1">
      <div className="flex justify-end">
        <Link
          to={`/projects/${projectId}`}
          className="bg-back hover:bg-back-hover text-white px-10 py-2 rounded-lg cursor-pointer transition-colors"
        >
          Volver al proyecto
        </Link>
      </div>
      <div className="mb-5 mt-10 grid md:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl">Administrar Responsables</h1>
          <p className="text-2xl font-light text-gray-500 mt-5">
            Administra el equipo de trabajo para este proyecto
          </p>
        </div>
        <button
         onClick={()=> navigate(location.pathname + '?addMember=true')}
         className="bg-success hover:bg-success-hover text-white text-lg font-bold py-2 mt-5 md:mt-0 px-8 rounded-lg shadow-lg text-center cursor-pointer">
          + Agregar responsables
        </button>
      </div>
      <AddMemberModal/>
    </div>
  );
}
