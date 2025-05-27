import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import {  useQuery } from "@tanstack/react-query";
import {  getFullProject } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import ProjectCard from "@/components/projects/ProjectCard";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";
import DetailTaskModal from "@/components/tasks/DetailTaskModal";
import Spinner from "@/components/Spinner";

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


  if (isLoading) return <Spinner/>;
  if (isError) return <Navigate to="/404" />;

  if (data)
    return (
      <div className="w-full grid grid-col-1">
        <div className="flex justify-end">
      <Link to="/projects" className="bg-back hover:bg-back-hover text-white px-10 py-2 rounded-lg cursor-pointer transition-colors">Volver</Link>
      </div>
      
        <ProjectCard project={data} />

        <div className="bg-bg-second shadow mt-10 rounded-lg p-5">
          <div className="mb-5 grid md:grid-cols-2 items-center">
            <h1 className="text-4xl text-white">Tareas del Proyectos</h1>

            <button
              onClick={() => navigate(location.pathname + "?newTask=true")}
              className="bg-success hover:bg-success-hover text-white text-lg font-bold py-2 mt-5 md:mt-0 px-8 rounded-lg shadow-lg text-center cursor-pointer"
            >
              + Crear
            </button>

            <div></div>
          </div>
        </div>

        <TaskList tasks={data.tasks}/>
        <AddTaskModal />
        <DetailTaskModal/>
        <EditTaskData/>
      </div>
    );
}
