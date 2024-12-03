import Image from "next/image"

export default function NavBarSecundario(){
    return(
        <div className="w-screen flex border-black p-5 gap-10 h-[10%]">
            <h1 className="text-2xl pl-5 text-center w-[10vw] pt-1">Cliente</h1> 
            <input className="w-6/12 border-2 shadow-2xl"></input>
            <button className=" w-[5vw] shadow-2xl border-2">Buscar</button>
            <div className="ml-[18%] relative w-[5vw] h-[9vh] bottom-4 flex border-2 border-black">
                <Image src="/image.png" alt="No hay imagen disponible" fill/>   
            </div>
            <p>Eduardo Yanez</p>
        </div>


    )
}