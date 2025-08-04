import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
        <h1 className='font-black text-center text-4xl text-white'>Página no encontrada</h1>
        <h2 className='font-black text-center text-8xl text-white'>404</h2>
        <p className='mt-10 text-center text-white'>Tal vez quieras volver a {' '} <Link className='text-bg-second p-2 font-bold bg-white rounded-lg' to={'/'}>Proyectos</Link></p>
    </>
  )
}
