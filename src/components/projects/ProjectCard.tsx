import { Link, useNavigate, useParams } from "react-router-dom";
import correo from "../../../public/email.png";
import whatsapp from "../../../public/whatsapp.png";
import { useMutation } from "@tanstack/react-query";
import { deleteProject } from "@/api/ProjectAPI";
import { formatDate } from "@/helpers/formatDate";
import { toast } from "react-toastify";
import { Project } from "@/types/index";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "../Spinner";
import { isManager } from "@/helpers/policies";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const { data: user, isLoading: authLoading } = useAuth();

  const params = useParams();
  const projectId = params.projectId!;
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/projects");
    },
  });
  if (authLoading) return <Spinner />;
  if (project && user)
    return (
      <div className="bg-white w-full shadow mt-10 rounded-lg p-5">
        <div className="md:flex justify-between mb-10 sm:grid sm:grid-cols-1">
          <h1 className="text-3xl">
            <b>Proyecto:</b> {project.projectName}
          </h1>
          <div className="flex items-center md:gap-4 gap-2 md:py-0 py-5">
            <Link
              to={`/projects/${project._id}/team`}
              className="py-2 px-4 border-bg-second border-2 rounded-lg text-bg-second hover:bg-bg-second hover:text-white font-bold"
            >
              Responsables
            </Link>
            {isManager(project.manager, user._id) && (
              <>
                <Link
                  to={`/projects/${project._id}/edit`}
                  className="bg-sky-500 py-2 px-4 rounded-lg text-white hover:bg-sky-700 font-bold"
                >
                  Editar Proyecto
                </Link>
                <button className="border-2 border-yellow-500 text-yellow-500  py-2 px-4 rounded-lg  hover:bg-yellow-500 hover:text-white font-bold">
                  Editar Estado
                </button>
                <button
                  className="border-2 border-red-500 text-red-500  py-2 px-4 rounded-lg  hover:bg-red-500 hover:text-white font-bold"
                  onClick={() => mutate(projectId)}
                >
                  Eliminar
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center mb-5">
          <b className="mr-5">Estado: </b>{" "}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <b>Cliente:</b> {project.clientName}
          </div>
          <div>
            <b>Categoría: {project.category}</b>
          </div>
        </div>
        <div className="mb-5">
          <b>Decripción:</b> {project.description}
        </div>
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <b>Lider de proyecto: </b> {project.manager.name}
          </div>
          <div className="flex flex-wrap gap-2">
            <b>Responsables: </b>{" "}
            {project.team.map((member) => (
              <div key={member._id}>
                <p className="ml-1">{member.name} | </p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <b>Fecha de inicio:</b> {formatDate(project.startDate)}
          </div>
          <div>
            <b>Fecha de finalización:</b> {formatDate(project.endDate)}
          </div>
        </div>
        <div>
          <b>Carpeta del proyecto: {project.folderProject}</b>
        </div>
        <div className="flex justify-end mb-5 mt-5">
          <div className="flex items-center gap-2 text-gray-500 hover:text-black">
            <b>Compartir:</b>
            <a>
              <img src={whatsapp} />
            </a>
            <a>
              <img src={correo} />
            </a>
          </div>
        </div>
      </div>
    );
}
