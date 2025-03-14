import { Link } from "react-router-dom";
import Logo from "./Logo";


export default function Sidebar() {
  return (
    <aside className="md:w-1/4 lg:w-1/5 xl:w-1/6 px-5 md:py-10 py-5 bg-[#4B62D3] text-left ">
      <Logo/>
        <div className="px-5 py-5 text-white grid grid-cols-5 md:grid md:grid-cols-1">
            <Link className="block mb-5" to="/">Inicio</Link>
            <Link className="block mb-5" to="/projects">Projectos</Link>
            <Link className="block mb-5 ml-2 text-sm md:block hidden" to="/projects/create">Crear Projectos</Link>
            <Link className="block mb-5" to="/users">Usuarios</Link>
            <Link className="block mb-5 ml-2 text-sm md:block hidden" to="/users/register">Crear Usuarios</Link>
        </div>
    </aside>
  )
}
