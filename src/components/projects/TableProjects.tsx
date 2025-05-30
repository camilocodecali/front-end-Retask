import { ProjectTableData, User } from "@/types/index";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";
import { formatDate } from "@/helpers/formatDate";

type ProjectFormProps = {
  project: ProjectTableData;
  user: User;
};

export default function TableProjects({ project, user }: ProjectFormProps) {
  console.log(project);
  
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteProject,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
  return (
    <tr key={project._id}>
      <td className=" p-10">{project.projectName}</td>
      <td className=" p-10">{formatDate(project.startDate)}</td>
      <td className=" p-10">{project.clientName}</td>
      <td className=" p-10">{project.manager.name}</td>
      <td className=" p-10">Estado</td>
      <td className=" p-10">{formatDate(project.endDate)}</td>
      <td className=" p-10">
        <Menu>
          <MenuButton className="px-3 py-2 bg-success rounded-lg hover:bg-success-hover text-white font-bold cursor-p">
            Acciones
          </MenuButton>
          <MenuItems
            className="bg-white p-5 rounded-2xl shadow-2xl"
            anchor="bottom"
          >
            <MenuItem>
              <Link
                className="py-1 border-b-1 border-gray-300 block data-[focus]:bg-blue-100"
                to={`/projects/${project._id}`}
              >
                Ver Proyecto
              </Link>
            </MenuItem>
            {project.manager._id === user?._id && (
              <>
                <MenuItem>
                  <Link
                    className="py-1 border-b-1 border-gray-300 block data-[focus]:bg-blue-100"
                    to={`/projects/${project._id}/edit`}
                  >
                    Editar Proyecto
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    className="py-1 border-b-1 border-gray-300 block data-[focus]:bg-blue-100"
                    onClick={() => mutate(project._id)}
                  >
                    Eliminar Proyecto
                  </button>
                </MenuItem>
              </>
            )}
          </MenuItems>
        </Menu>
      </td>
    </tr>
  );
}
