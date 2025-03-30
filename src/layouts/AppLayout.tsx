import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/hooks/useAuth";

export default function AppLayout() {
  const {data, isError, isLoading} = useAuth()
  if(isLoading) return 'Cargando...'
  if(isError) {
    return <Navigate to='/auth/login'/>
  }

  if(data) return (
    <>
      <div className="bg-gray-100">
        <div className="md:flex md:min-h-screen">
          <Sidebar
            user={data}
          />
          <main className="md:w-screen pt-20 md:pl-20 md:pr-20 pl-2 pr-2">
            <Outlet />
          </main>
        </div>
        <footer className="py-3 bg-blue-900 text-white">
              <p className="text-center">
                Todos los derechos reservados {new Date().getFullYear()}
              </p>
            </footer>
      </div>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
    </>
  );
}
