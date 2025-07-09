
export default function AddNoteForm() {
  return (
    <form
        onSubmit={()=>{}}
        className='space-y-3'
        noValidate
    >
        <div className="flex flex-col gap-2">
            <label className="font-bold" htmlFor="content">Crear Nota</label>
            <input type="text" id='content' placeholder='Contenido de la nota' className="w-full p-3 border border-gray-300" />
        </div>
        <input type="submit" className="bg-bg-second hover:bg-blue-800 w-full p-2 text-white font-bold cursor-pointer" value="Crear Nota" />
    </form>
  )
}
