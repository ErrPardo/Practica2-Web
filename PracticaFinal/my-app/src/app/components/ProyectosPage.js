"use client"

import { useEffect,useState } from "react";
import NavBarProyectos from "./navBarProyectos"
import {Select, SelectSection, SelectItem} from "@nextui-org/select";
export default function ProyectosPage(){
    
    

    return(
        <>
        <NavBarProyectos/>
        <ContentPage/>
        </>

    )
}


const ContentPage=()=>{
    
    
    
    const [projects,setProjects]=useState(null)
    
    useEffect(()=>{
        const token=localStorage.getItem('jwt')
        fetch(`https://bildy-rpmaya.koyeb.app/api/project`,{   
            headers:{ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},  
        })
        .then(result=>(result.json()))
        .then(json=>(console.log(json),setProjects(json)))
    },[])
    
    return(
        <div className="h-[80%] p-6 m-5 border-2 border-gray-300 flex flex-col">
            <div className="h-[7%] flex gap-14">
                <input className="w-[45%] border-2 shadow-2xl h-full"></input>
                <button className="w-[15%] border-2 shadow-2xl h-full hover:bg-slate-300">Filters</button>
                <button className="w-[15%] border-2 shadow-2xl h-full hover:bg-slate-300">Calendario</button>
                <button className="w-[15%] border-2 shadow-2xl h-full hover:bg-slate-300">Descargar</button>
            </div>
            <div className="border-2 border-gray-300 mt-5 h-full p-6 gap-5 ">
                <div className="border-2 border-gray-300 p-6 gap-5 flex">
                <input type="checkbox"></input>
                <Select
                    className="w-1/5"
                    placeholder="Código"
                    aria-labelledby="select-label"
                    slots={{
                    base: "relative w-full border border-gray-300 rounded-md p-2 pr-8 focus:ring-2 focus:ring-blue-500",
                    dropdownIndicator: "absolute right-3 inset-y-0 flex items-center pointer-events-none text-gray-400",
                    }}
                    >
                    
                </Select>
                <select className="w-1/5 border-gray-300 border-2 rounded-md p-2 focus:ring-2 focus:ring-blue-500" ></select>
                <select className="w-1/5 border-gray-300 border-2 rounded-md p-2 focus:ring-2 focus:ring-blue-500" placeholder="Nombre"></select>
                <select className="w-1/5 border-gray-300 border-2 rounded-md p-2 focus:ring-2 focus:ring-blue-500" placeholder="Cliente"></select>
                <select className="w-1/5 border-gray-300 border-2 rounded-md p-2 focus:ring-2 focus:ring-blue-500" placeholder="Codigo Interno"></select>
                <select className="w-1/5 border-gray-300 border-2 rounded-md p-2 focus:ring-2 focus:ring-blue-500" placeholder="Status"></select>
                </div>
                <div className="border-2 border-gray-300 p-6 gap-5 flex">
                    {projects && projects.map((item)=>(
                    <>
                    <p>{item.projectCode}</p>
                    <p>{item.createdAt}</p>
                    <p>nombre</p>
                    <p>{item.clientId}</p>
                    <p>{item.active}</p>
                    </>
                    ))
                    }
                </div>
            </div>
        </div>
        
    )
}