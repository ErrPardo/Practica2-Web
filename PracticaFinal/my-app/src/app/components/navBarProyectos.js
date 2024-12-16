import Image from "next/image"
export default function NavBarProyectos(){
    return(  
        <div className="w-full flex items-center justify-between p-4">
      <h1 className="text-3xl font-semibold text-gray-800">Proyectos</h1>
      <div className="flex items-center gap-4 w-1/2 max-w-lg">
        <input className="w-full p-2 border-2 border-gray-300 rounded-lg shadow-sm" type="text" placeholder="Buscar Proyecto..."/>
        <button className="w-[120px] bg-blue-600 text-white p-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200">Buscar</button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gray-300">
          <Image src="/image.png" 
                alt="No hay imagen disponible" 
                fill 
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 10vw"
                style={{ objectFit: "cover" }}/>
        </div>
        <p className="text-gray-700 font-medium">Eduardo Yanez</p>
      </div>
    </div>
    )
}