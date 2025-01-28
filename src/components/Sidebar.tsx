import Logo from "./Logo";


export default function Sidebar() {
  return (
    <aside className="md:w-1/4 lg:w-1/5 xl:w-1/6 px-5 py-10 bg-[#4B62D3]">
      <Logo/>
        <div>
            Menu
        </div>
    </aside>
  )
}
