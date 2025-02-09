import { Link } from "react-router-dom";
import Logo from "./Logo";


export default function Sidebar() {
  return (
    <aside className="md:w-1/4 lg:w-1/5 xl:w-1/6 px-5 py-10 bg-[#4B62D3] text-left">
      <Logo/>
        <div className="px-5 py-5 text-white">
            <Link className="block mb-5" to="/">Inicio</Link>
            <Link className="block mb-5" to="/projects">Projectos</Link>
            <Link className="block mb-5 ml-2 text-sm" to="/projects/create">Crear Projectos</Link>
        </div>
    </aside>
  )
}
