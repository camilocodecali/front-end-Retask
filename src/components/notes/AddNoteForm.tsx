import { NoteFormData } from '@/types/index'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../ErrorMessage'

export default function AddNoteForm() {

    const initialValues : NoteFormData = {
        content: ''
    }

    const { register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})
    const handleAddNote = (formData: NoteFormData) => {
        console.log(formData);
        
    }

  return (
    <form
        onSubmit={handleSubmit(handleAddNote)}
        className='space-y-3'
        noValidate
    >
        <div className="flex flex-col gap-2">
            <label className="font-bold" htmlFor="content">Crear Nota</label>
            <input type="text" id='content' placeholder='Contenido de la nota' className="w-full p-3 border border-gray-300" 
            {...register('content', {
                required: 'El contenido de la nota es obligatorio'
            })}
            />
            {errors.content && (
                <ErrorMessage>{errors.content?.message}</ErrorMessage>
            )}
        </div>
        <input type="submit" className="bg-bg-second hover:bg-blue-800 w-full p-2 text-white font-bold cursor-pointer" value="Crear Nota." />
    </form>
  )
}
