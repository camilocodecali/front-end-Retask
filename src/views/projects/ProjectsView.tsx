import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/api/ProjectAPI";
import TableProjects from "@/components/projects/TableProjects";

export default function ProjectsView() {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  console.log(data);

  if (isLoading) return "Cargando....";

  if (data)
    return (
      <>
        <h1 className="text-4xl">Proyectos</h1>
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
          <div className="flex justify-between mb-10">
            <div className="block md:flex  gap-4">
              <p>Filtrar por:</p>
              <button className="bg-green-300 text-green-950 px-4 text-sm h-6 rounded-lg cursor-pointer font-bold mb-1 md:mb-0">
                Finalizado
              </button>
              <button className="bg-orange-300 text-orange-800 px-4 text-sm h-6 rounded-lg cursor-pointer font-bold mb-1 md:mb-0">
                Progreso
              </button>
              <button className="bg-red-300 text-red-800 px-4 text-sm h-6 rounded-lg cursor-pointer font-bold mb-1 md:mb-0">
                Retrasado
              </button>
            </div>
            <div className="block md:flex gap-4 align-middle">
              Ordenar por:
              <form>
                <select className="border border-slate-400 px-4 py-1 rounded-lg">
                  <option>Opción</option>
                </select>
              </form>
            </div>
          </div>
          <div className="relative overflow-x-auto">
            <table className="table-auto w-full border-collapse text-left">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Fecha de Inicio</th>
                  <th>Cliente</th>
                  <th>Líder de proyecto</th>
                  <th>Estado</th>
                  <th>Fecha de finalización</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.length ? (
                  <>
                    {data.map((project) => (
                      <TableProjects key={project._id} project={project}/>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td className="border-b-2 border-slate-300 p-3">No hay proyectos</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="fixed bottom-10 right-10">
          <Link
            to="/projects/create"
            className="bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-8 px-4 rounded-full shadow-lg"
          >
            + Crear
          </Link>
        </div>
      </>
    );
}
