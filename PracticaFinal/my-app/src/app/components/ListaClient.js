"use client"

import { useEffect, useState } from "react"
import NavBarSecundario from "../components/navBarSecundario"
import { useRouter } from "next/navigation";
import { useContext } from 'react';
import { ThemeContext } from "./Context";
import Link from "next/link";


export default function ClientList(){

    
    const [ clients] = useContext(ThemeContext);
    const [crearProject,setCrearProject]=useState(null)
    const [detalleProject,setDetalleProject]=useState([])
    const router=useRouter()
    const [content,setContent]=useState(null)
    const handleClick=(item,setDetalleProject)=>{
        setContent(<DetalleCliente item={item} setDetalleProject={setDetalleProject}/>)
        localStorage.setItem('client',JSON.stringify(item))
        setCrearProject(<Link className="text-xl w-[15%] font-semibold text-blue-500 text-end text-decoration-line: underline hover:text-blue-700 transform transition-transform duration-200 ease-in-out" href="../projectCreate">Crear Proyecto</Link>)
    }

    
    //lista de clientes ponerle overflow-y auto
    
    return(
        <>
        <NavBarSecundario></NavBarSecundario>
        <div className="flex h-[80%]">
            <div className="border border-gray-300 shadow-xl w-1/4 h-full flex flex-col p-3 items-center bg-white rounded-xl overflow-y-auto ml-2">
                <p className="w-full text-3xl font-semibold p-1 text-gray-800">ListaClientes</p> 
                {clients && clients.map((item)=><button key={item._id} onClick={()=>handleClick(item,setDetalleProject)} className="h-[10%] mt-5 justify-center flex-col  gap-2 flex border-2 shadow-md p-4 mb-5 w-full rounded-lg text-lg hover:bg-slate-200 transition-all duration-300 ease-in-out">{item.name}<p className="text-sm text-gray-500">Este proyecto quita mucho tiempo</p></button>)}
                <button className="flex border-2 h-full justify-center flex-col text-xl gap-2 w-full p-4 mt-5 bg-blue-500 text-white rounded-md hover:bg-blue-700 transform transition-transform duration-200 ease-in-out" onClick={()=>router.push('../clientCreate')}>CrearNuevoCliente</button>
            </div>
            <div className="flex flex-col w-[74%] h-full pl-5 space-y-2">
                <div className="border border-gray-300 h-full bg-white rounded-xl shadow-lg p-6 ">
                    <p className="w-full text-3xl font-semibold p-1 text-gray-800">DatosCliente</p> 
                    {content}
                </div>
                <div className="border-gray-300 border h-full bg-white rounded-xl shadow-lg p-6 overflow-y-auto">
                    <div className="flex items-end gap-2">
                        <p className="w-full text-3xl font-semibold p-1 text-gray-800">Proyectos</p>
                        {crearProject}
                        <Link className="text-xl w-[10%] font-semibold text-blue-500 text-end text-decoration-line: underline hover:text-blue-700 transform transition-transform duration-200 ease-in-out" href="../projectList">Ver todos</Link>
                    </div>
                    <div className="border-gray-300 border h-[85%]  p-6 flex flex-col  items-center bg-white rounded-xl shadow-lg overflow-y-auto">
                        <div className="gap-28 flex w-[90%]">
                            <p className="w-[15%] text-sm font-semibold text-gray-700 p-2">Numero</p>
                            <p className="w-[15%] text-sm font-semibold text-gray-700 p-2" >Nombre</p>
                            <p className="w-[15%] text-sm font-semibold text-gray-700 p-2" >Codigo</p>
                            <p className="w-[15%] text-sm font-semibold text-gray-700 p-2" >Fecha</p>
                            <p className="w-[15%] text-sm font-semibold text-gray-700 p-2" >Estado</p>
                        </div>
                            {detalleProject && detalleProject.map((item,index)=>(                              
                                <div className="p-6 gap-28 flex rounded-xl shadow-lg w-[90%] h-[50%] " key={index}>
                                    <p className="w-[15%] text-xl font-semibold text-gray-700 p-2">{'0'+(index+1)}</p>
                                    <p className="w-[15%] text-sm font-semibold text-gray-700 p-2">{item.name}</p>
                                    <p className="w-[15%] text-sm font-semibold text-gray-700 p-2">{item.projectCode}</p>
                                    <p className="w-[15%] text-sm font-semibold text-gray-700 p-2">{item.createdAt}</p>
                                    <p className="w-[15%] text-sm font-semibold text-gray-700 p-2">{item.active.toString()}</p>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



function DetalleProyectoClient(clientId,setDetalleProject){
    const token=localStorage.getItem('jwt')
   
        fetch(`https://bildy-rpmaya.koyeb.app/api/project/${clientId}`,{
            headers:{ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        })
        .then(result=>result.json())
        .then(json=>{setDetalleProject(json)})
    
}

const DetalleCliente=({item,setDetalleProject})=>{
    DetalleProyectoClient(item._id,setDetalleProject)
    return(
        <>
            <div className="flex flex-row h-[90%]">
                <div className="w-[75%] border border-gray-300 m-2 flex flex-row p-6 flex-wrap gap-2 justify-center shadow-md items-center bg-white rounded-lg">
                    <div className="w-[50%] h-[25%]  flex items-center flex-col">
                        <p className="text-2xl font-semibold text-gray-700">Domicilio fiscal</p>
                        <p>{item.address.street+item.address.number}</p>
                    </div>
                    <div className="w-[47%] h-[25%]  flex items-center flex-col">
                        <p className="text-2xl font-semibold text-gray-700">Codigo postal</p>
                        <p>{item.address.postal}</p>
                    </div>
                    <div className="w-[50%] h-[25%]  flex items-center flex-col">
                        <p className="text-2xl font-semibold text-gray-700">Ciudad</p>
                        <p>{item.address.province}</p>
                    </div>
                    <div className="w-[47%] h-[25%] flex items-center flex-col">
                        <p className="text-2xl font-semibold text-gray-700">Cif</p>
                        <p>{item.cif}</p>
                    </div>
                </div>
                <div className="flex flex-col border border-gray-300 m-2 p-6 w-[25%] bg-white rounded-lg shadow-lg justify-center items-center">
                <div className=" w-[50%] h-[50%] rounded-lg overflow-hidden">
                    <img className="object-cover w-full h-full" src={item.logo} alt="No hay logo disponible" />
                </div>
                <button className="w-full p-4 mt-3 bg-gray-200 text-lg font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none transition-all duration-300 transform hover:scale-105">Editar</button>
            </div>
                
            </div>
        </>
    )
}