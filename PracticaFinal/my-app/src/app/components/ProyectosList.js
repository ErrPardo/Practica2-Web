"use client"

import NavBarProyectos from "./navBarProyectos"
import { ThemeProject } from "./ContextProject";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import ToolBar from "./ToolBar";

export default function ProyectosPage(){

    return(
        <>
        <NavBarProyectos/>
        <ContentPage/>
        </>

    )
}


const ContentPage=()=>{
    
    const [projects]=useContext(ThemeProject)
    
    return(
        <div className="h-[80%] p-6 m-5 border shadow-xl  bg-white rounded-xl  border-gray-300 flex flex-col ">
            <ToolBar/>
            <ContentProject projects={projects}/>
        </div>
        
    )
}




const Header = () => {
    return (
        <div className="flex items-center p-6 gap-6 border-b border-gray-300">
            <input type="checkbox" className="h-4 w-4 border-gray-300 rounded-md p-2"/>
            <div className="flex-1 text-center font-semibold text-gray-700 border  rounded-md shadow-lg bg-gray-200 p-2">Código</div>
            <div className="flex-1 text-center font-semibold text-gray-700 border  shadow-lg bg-gray-200 rounded-md p-2 ">Fecha</div>
            <div className="flex-1 text-center font-semibold text-gray-700 border  shadow-lg bg-gray-200 rounded-md p-2 ">Nombre</div>
            <div className="flex-1 text-center font-semibold text-gray-700 border  shadow-lg bg-gray-200 rounded-md p-2">Cliente</div>
        </div>
    )
}


const ContentProject=({projects})=>{
    const router=useRouter()
    const handleRedirect=(checked,project)=>{
        if(checked){
            localStorage.setItem('projectOne',JSON.stringify(project))
            router.push('../projectDetail')
        }
    }

    return(
        <div className="border border-gray-300 mt-5 h-full p-6 overflow-y-auto shadow-xl  bg-white rounded-xl">
            <Header/>
            {projects && projects.map((item) => (
                <div key={item.projectCode} className="border-b border-gray-300 p-6 gap-6 flex mt-5 items-center">
                    <input type="checkbox" onChange={(e)=>handleRedirect(e.target.checked,item)} className="h-4 w-4 border-gray-300 rounded-md p-2"/>
                    <p className="flex-1 text-center font-semibold text-gray-700 border  shadow-lg bg-gray-200 rounded-md p-2">{item.projectCode}</p>
                    <p className="flex-1 text-center font-semibold text-gray-700 border  shadow-lg bg-gray-200 rounded-md p-2">{new Date(item.createdAt).toLocaleDateString()}</p>
                    <p className="flex-1 text-center font-semibold text-gray-700 border  shadow-lg bg-gray-200 rounded-md p-2">{item.name}</p>
                    <p className="flex-1 text-center font-semibold text-gray-700 border  shadow-lg bg-gray-200 rounded-md p-2">{item.clientId}</p>
                </div>
            ))}
        </div>
    )
}