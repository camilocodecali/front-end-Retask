import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import {  useQuery } from "@tanstack/react-query";
import {  getFullProject } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import ProjectCard from "@/components/projects/ProjectCard";

export default function ProjectDetailsView() {
  const params = useParams();
  const projectId = params.projectId!;
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getFullProject(projectId),
    retry: false,
  });


  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to="/404" />;

  if (data)
    return (
      <>
        <ProjectCard project={data} />

        <div className="bg-blue-400 shadow mt-10 rounded-lg p-5">
          <div className="mb-5 grid grid-cols-2 items-center">
            <h1 className="text-4xl text-white">Tareas del Proyectos</h1>

            <button
              onClick={() => navigate(location.pathname + "?newTask=true")}
              className="bg-green-600 hover:bg-green-500 text-white text-lg font-bold py-2 px-8  rounded-lg shadow-lg text-center"
            >
              + Crear
            </button>

            <div></div>
          </div>
        </div>
        <AddTaskModal />
      </>
    );
}
