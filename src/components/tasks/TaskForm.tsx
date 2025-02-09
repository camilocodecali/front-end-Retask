

export default function TaskForm() {
  return (
    <>
                        <div className="mb-5 grid grid-cols-1 gap-4">
                      <div>
                        <label
                          className="text-gray-700 capitalize font-bold text-sm"
                          htmlFor="nombre"
                        >
                          Título
                        </label>
                        <input
                          id="nombre"
                          type="text"
                          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                          placeholder="Título de la tarea"
                        />
                      </div>
                    </div>
                    <div className="mb-5 grid grid-cols-2 gap-4">
                      <div>
                        <label
                          className="text-gray-700 capitalize font-bold text-sm"
                          htmlFor="proyecto"
                        >
                          Proyecto
                        </label>
                        <input
                          id="proyecto"
                          type="text"
                          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                          disabled
                        />
                      </div>
                      <div>
                        <label
                          className="text-gray-700 capitalize font-bold text-sm"
                          htmlFor="colaborador"
                        >
                          Responsable
                        </label>
                        <select
                          id="colaborador"
                          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                        >
                          <option value="">--Seleccionar--</option>
                          
                        </select>
                      </div>
                    </div>
                    <div className="mb-5 grid grid-cols-2 gap-4">
                      <div>
                        <label
                          className="text-gray-700 capitalize font-bold text-sm"
                          htmlFor="fechaInicio"
                        >
                          Fecha de inicio
                        </label>
                        <input
                          id="fechaInicio"
                          type="date"
                          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                        />
                      </div>
                      <div>
                        <label
                          className="text-gray-700 capitalize font-bold text-sm"
                          htmlFor="fechaEntrega"
                        >
                          Fecha Entrega
                        </label>
                        <input
                          id="fechaEntrega"
                          type="date"
                          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="mb-5 grid grid-cols-1 gap-4">
                      <div>
                        <label
                          className="text-gray-700 capitalize font-bold text-sm"
                          htmlFor="linkRecursos"
                        >
                          Link recursos de la tarea
                        </label>
                        <input
                          id="linkRecursos"
                          type="text"
                          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-lg"
                          placeholder="Pegue aquí el de recursos"

                        />
                      </div>
                    </div>

                    <div className="mb-5">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="descripcion"
                      >
                        Descripción
                      </label>
                      <textarea
                        id="descripcion"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Descripción del Proyecto"
                      />
                    </div>
    </>
  )
}
