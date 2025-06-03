import { Link } from "react-router-dom";
import Logo from "./Logo";
import { User } from "../types";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "./Spinner";
import { isAdmin } from "@/helpers/policies";

type SideMenuProps = {
  user: User;
};

export default function Sidebar({ user }: SideMenuProps) {
  const { data: userAuth, isLoading: authLoading } = useAuth();

  const queryClient = useQueryClient();

  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };
  if (authLoading) return <Spinner />;
  if (userAuth)
    return (
      <aside className="md:w-1/6 lg:w-1/6 xl:w-1/6 px-5 md:py-10 py-5 bg-[#4B62D3] text-left min-w-[200px]">
        <Logo />
        <div className="px-5 py-5 text-white grid grid-cols-5 md:grid md:grid-cols-1">
          <p className="py-2 px-2 mb-5 text-center text-sm bg-white text-blue-900 rounded-2xl">
            ¡Hola, {user.name}!
          </p>
          <Link className="block mb-5" to="/">
            Inicio
          </Link>
          <Link className="block mb-5" to="#">
            Proyectos
          </Link>
          {isAdmin(userAuth) && (
            <Link className="block mb-5 ml-2 text-sm" to="/projects">
              Todos los Proyectos
            </Link>
          )}
          <Link className="block mb-5 ml-2 text-sm" to="/projects">
            Mis los Proyectos
          </Link>
          <Link className="block mb-5 ml-2 text-sm" to="/projects/create">
            Crear Proyectos
          </Link>
          {isAdmin(userAuth) && (
            <>
              <Link className="block mb-5" to="/users">
                Usuarios
              </Link>
              <Link className="block mb-5 ml-2 text-sm" to="/users/register">
                Crear Usuarios
              </Link>
            </>
          )}

          <button
            className="block p-2 rounded-2xl bg-red-700 text-white hover:bg-red-600 cursor-pointer"
            onClick={logout}
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>
    );
}
