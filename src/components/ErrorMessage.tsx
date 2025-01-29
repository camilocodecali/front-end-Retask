
export default function ErrorMessage({children}: {children: React.ReactNode}) {
  return (
    <div className="text-center my-4 bg-red-100 text-red-600 font-bold p-2 uppercase text-[10px]
">
      {children}
    </div>
  )
}
