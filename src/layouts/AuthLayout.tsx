import Logo from "@/components/Logo"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

function AuthLayout() {
  return (
    <>
    <main className="mx-auto p-5 md:p-40 md:flex md:justify-center h-screen bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat">
    <div className="md:w-2/3 lg:w-2/5 md:justify-center">
    <Logo/>
      
      <Outlet/>
    </div>
    </main>

    <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>

  )
}

export default AuthLayout
