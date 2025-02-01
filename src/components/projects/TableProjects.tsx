import {  ProjectTableData } from "@/types/index";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Link } from "react-router-dom";


type ProjectFormProps = {
    project: ProjectTableData
}

export default function TableProjects({project}: ProjectFormProps) {
  return (

      <tr key={project._id}>
        <td className="border-b-2 border-slate-300 p-2">
          {project.projectName}
        </td>
        <td className="border-b-2 border-slate-300 p-2">{project.startDate}</td>
        <td className="border-b-2 border-slate-300 p-2">
          {project.clientName}
        </td>
        <td className="border-b-2 border-slate-300 p-2">Lider</td>
        <td className="border-b-2 border-slate-300 p-2">Estado</td>
        <td className="border-b-2 border-slate-300 p-2">{project.endDate}</td>
        <td className="border-b-2 border-slate-300 p-2">
        <Menu>
      <MenuButton className="px-3 py-2 bg-amber-600 rounded-lg hover:bg-amber-700 text-white font-bold">Acciones</MenuButton>
      <MenuItems className="bg-white p-5 rounded-2xl shadow-2xl" anchor="bottom">
        <MenuItem>
          <Link className="py-1 border-b-1 border-gray-300 block data-[focus]:bg-blue-100" to="/settings">
            Ver Proyecto
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className="py-1 border-b-1 border-gray-300 block data-[focus]:bg-blue-100" to="/support">
            Editar Proyecto
          </Link>
        </MenuItem>
        <MenuItem>
          <Link className="py-1 border-b-1 border-gray-300 block data-[focus]:bg-blue-100" to="/license">
            Eliminar Proyecto
          </Link>
        </MenuItem>
      </MenuItems>
    </Menu>


        </td>
      </tr>
    
  );
}
