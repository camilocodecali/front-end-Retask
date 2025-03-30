import { Link } from "react-router-dom";
import Logo from "./Logo";
import { User } from "../types";

type SideMenuProps = {
  user: User
}

export default function Sidebar({user}: SideMenuProps) {
  return (
    <aside className="md:w-1/4 lg:w-1/5 xl:w-1/6 px-5 md:py-10 py-5 bg-[#4B62D3] text-left ">
      <Logo/>
        <div className="px-5 py-5 text-white grid grid-cols-5 md:grid md:grid-cols-1">
            <p className="py-2 px-2 mb-5 text-center text-sm bg-white text-blue-900 rounded-2xl">¡Hola, {user.name}!</p>
            <Link className="block mb-5" to="/">Inicio</Link>
            <Link className="block mb-5" to="/projects">Projectos</Link>
            <Link className="block mb-5 ml-2 text-sm" to="/projects/create">Crear Projectos</Link>
            <Link className="block mb-5" to="/users">Usuarios</Link>
            <Link className="block mb-5 ml-2 text-sm" to="/users/register">Crear Usuarios</Link>
        </div>
    </aside>
  )
}
