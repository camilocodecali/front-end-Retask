import { getUsers } from '@/api/AuthAPI'
import TableUsers from '@/components/users/TableUsers';
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom';

export default function UsersView() {
  const {data, isLoading} = useQuery({
    queryKey: ["users"],
    queryFn: getUsers
  });

  if(isLoading) return "Cargando...";
  if(data) return (
<>
<h1 className="text-4xl">Usuarios</h1>
        <div className="bg-white shadow mt-10 rounded-lg p-5">
          <div className="mb-5">
            <div className="relative flex">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="py-2 px-6 w-full text-left border-2 rounded-2xl text-slate-400 pl-10"
                placeholder="Buscar por: Título, cliente o fecha"
              />
            </div>
          </div>
          <div className="relative overflow-x-auto">
            <table className="table-auto w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="border-b-1 border-slate-200 p-2 pb-5">Nombre</th>
                  <th className="border-b-1 border-slate-200 p-2 pb-5">Identificación</th>
                  <th className="border-b-1 border-slate-200 p-2 pb-5">Correo</th>
                  <th className="border-b-1 border-slate-200 p-2 pb-5">Teléfono</th>
                  <th className="border-b-1 border-slate-200 p-2 pb-5">Cargo</th>
                  <th className="border-b-1 border-slate-200 p-2 pb-5">Estado</th>
                  <th className="border-b-1 border-slate-200 p-2 pb-5">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.length ? (
                  <>
                  {data.map((user)=>(
                    <TableUsers key={user._id} user={user}/>
                  ))}
                  </>
                ): (
                  <tr>
                    <td className="border-b-2 border-slate-300 p-3">No hay Usuarios</td>
                  </tr>
                )}

              </tbody>
            </table>
          </div>
        </div>
        <div className="fixed bottom-10 right-10">
          <Link
            to="/users/register"
            className="bg-success hover:bg-success-hover text-white text-lg font-bold py-9 px-4 rounded-full shadow-lg cursor-pointer"
          >
            + Crear
          </Link>
        </div>
</>
  )
}
