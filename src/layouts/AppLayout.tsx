import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

export default function AppLayout() {
  return (
    <>
    <div className="bg-gray-100">
        <div className="md:flex md:min-h-screen">
        <Sidebar/>
        
        <Outlet/>
        </div>
    </div>
    <footer className="py-5">
        <p className="text-center">Todos los derechos reservados {new Date().getFullYear()}</p>
    </footer>

    </>
  )
}
