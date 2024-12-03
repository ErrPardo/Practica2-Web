"use client"

import { useState } from "react"
import NavBarSecundario from "../components/navBarSecundario"
import { useRouter } from "next/navigation";
import { useContext } from 'react';
import { ThemeContext } from "./Context";
export default function ClientList(){

    
    const [ clients] = useContext(ThemeContext);
    const router=useRouter()
    const [content,setContent]=useState(null)
    const handleClick=(item)=>{
        setContent(<DetalleCliente item={item}/>)
    }

    
    
    return(
        <>
        <NavBarSecundario></NavBarSecundario>
        <div className="flex h-[85%]">
            <div className="border-2 border-gray-300 shadow-xl w-1/4 h-full mt-5 flex flex-col p-6 items-center gap-5 bg-white rounded-xl">
                <p className="w-full text-3xl">ListaClientes</p> 
                {clients && clients.map((item)=><button key={item._id} onClick={()=>handleClick(item)} className="flex border-2 shadow-2xl w-[75%] h-[10%] mt-5 rounded justify-center flex-col text-xl gap-2 hover:bg-slate-300">{item.name}<p className="text-xs text-gray-500">Este proyecto quita mucho tiempo</p></button>)}
                <button className="flex border-2 shadow-2xl w-[75%] h-[10%] mt-5 rounded justify-center flex-col text-xl gap-2 hover:bg-slate-300" onClick={()=>router.push('../clientCreate')}>CrearNuevoCliente</button>
            </div>
            <div className="flex flex-col w-[74%] h-full pl-5 space-y-2 mt-5">
                <div className="border-2 border-gray-300 flex-1 bg-white rounded-xl shadow-lg p-6 relative">
                    <p className="w-full text-3xl">DatosCliente</p> 
                    <div className="absolute inset-0 rounded-xl border-2 border-dashed border-blue-300 pointer-events-none"></div>
                    {content}
                </div>
                <div className="border-gray-300 border-2 flex-1 bg-white rounded-xl shadow-lg p-6 relative">
                <p className="w-full text-3xl">Proyectos</p>
                <div className="absolute inset-0 rounded-xl border-2 border-dashed border-pink-300 pointer-events-none"></div>
                </div>
            </div>
        </div>
        </>
    )
}


const DetalleCliente=({item})=>{
    return(
        <>
            <div className="flex flex-row border-2 border-gray-300 h-[90%]">
                <div className="w-[75%] border-2 border-gray-300 m-2 flex flex-row p-6 flex-wrap gap-2 justify-center items-center">
                    <div className="w-[50%] h-[25%] border-2 border-gray-300">
                        <p className="text-xl">Domicilio fiscal</p>
                        <p>{item.address.street+item.address.number}</p>
                    </div>
                    <div className="w-[47%] h-[25%] border-2 border-gray-300">
                        <p className="text-xl">Codigo postal</p>
                        <p>{item.address.postal}</p>
                    </div>
                    <div className="w-[50%] h-[25%] border-2 border-gray-300">
                        <p className="text-xl">Ciudad</p>
                        <p>{item.address.province}</p>
                    </div>
                    <div className="w-[47%] h-[25%] border-2 border-gray-300">
                        <p className="text-xl">Cif</p>
                        <p>{item.cif}</p>
                    </div>
                </div>
                <div className="flex flex-col border-2 border-gray-300 m-2 p-6 w-[25%]">
                    <div className="w-full border-2 border-gray-300 h-[70%]">Image</div>
                    <button className="flex border-2 shadow-2xl w-full h-[20%] mt-5 rounded justify-center items-center flex-col text-xl gap-2 hover:bg-slate-300">Editar</button>
                </div>
                
            </div>
        </>
    )
}