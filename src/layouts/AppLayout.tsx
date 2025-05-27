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
          <main className="w-full pt-20 px-2 md:px-20 overflow-x-auto">
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
