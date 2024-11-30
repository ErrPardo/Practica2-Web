import Link from "next/link";

export default function NavBar(){
    const nav=["resumen","project","client","albarenes","proveedores","ajustes"]
    return(

        /*resumen, no
        clientes,
        proyectos,
        albarenes,
        proveedores, no
        ajustes no*/
        
        <>
        <div className="flex border-t-2 border-b-2 rounded border-black h-15 justify-center gap-7 p-3">
            {nav.map((item,index)=><Link key={index} className="border-2 rounded w-10/12 border-black hover:bg-slate-300 shadow-xl" href={`../${item}`}>{item}</Link>)}
        </div>
        
        </>


    )
}