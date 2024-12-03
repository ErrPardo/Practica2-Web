import Image from "next/image"
export default function NavBarProyectos(){
    return(  
        <div className="w-screen flex border-black mt-5 gap-10 h-[5vh]">
            <h1 className="text-2xl pl-5 text-center w-[10vw] pt-1">Proyectos</h1> 
            <input className="w-6/12 border-2 shadow-2xl"></input>
            <button className=" w-[5vw] shadow-2xl border-2">Buscar</button>
            <div className="ml-[18%] relative w-[5vw] h-[8.5vh] bottom-4 flex border-2 border-black">
                <Image src="/image.png" alt="No hay imagen disponible" fill/>   
            </div>
            <p>Eduardo Yanez</p>
        </div>
    )
}