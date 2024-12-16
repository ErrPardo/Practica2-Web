"use client"

import { useEffect,useState } from "react"
import ToolBar from "./ToolBar"
import NavBarProyectos from "./navBarProyectos"
import { set } from "react-hook-form"

export default function AlbaranesList(){
    const [albaranes,setAlbaranes]=useState([])
    const [albaran,setAlbaran]=useState([])

    useEffect(()=>{
        const token=localStorage.getItem('jwt')
        fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote`,{
            headers:{ 'Authorization': `Bearer ${token}`}, 
        })
        .then(result=>(result.json()))
        .then(json=>{setAlbaranes(json)})
    },[])


    return(
        <>  
            <NavBarProyectos/>
            <div className="h-[80%] p-6 m-5 border shadow-xl  bg-white rounded-xl  border-gray-300 flex flex-col ">
                <ToolBar albaran={albaran}/>
                <ContentAlbaran albaranes={albaranes} setAlbaran={setAlbaran}></ContentAlbaran>
            </div>
        </>
    )
}


const Header = () => {
    return (
        <div className="flex items-center p-6 gap-6 border-b border-gray-300">
            <input type="checkbox" className="h-4 w-4 border-gray-300 rounded-md p-2"/>
            <div className="flex-1 text-center font-semibold text-gray-700 border  rounded-md shadow-lg bg-gray-200 p-2">Horas trabajadas</div>
            <div className="flex-1 text-center font-semibold text-gray-700 border  shadow-lg bg-gray-200 rounded-md p-2 ">Descripcion</div>
            <div className="flex-1 text-center font-semibold text-gray-700 border  shadow-lg bg-gray-200 rounded-md p-2 ">Workdate</div>
            <div className="flex-1 text-center font-semibold text-gray-700 border  shadow-lg bg-gray-200 rounded-md p-2">Proyecto</div>
        </div>
    )
}


const ContentAlbaran=({albaranes,setAlbaran})=>{
    const handleRedirect=(checked,albaran)=>{
        const button=document.getElementById('Button')
        if(checked){
            
            button.style.backgroundColor='rgb(59 130 246)'
            button.style.color='white'
            setAlbaran(albaran)
        }
        else{
            button.style.backgroundColor='rgb(229 231 235)'
            button.style.color='rgb(55 65 81)'
            setAlbaran([])
        }
        
    }

    return(
        <div className="border border-gray-300 mt-5 h-full p-6 overflow-y-auto shadow-xl  bg-white rounded-xl">
            <Header/>
            {albaranes && albaranes.map((item) => (
                <div key={item._id} className="border-b border-gray-300 p-6 gap-6 flex mt-5 items-center">
                    <input type="checkbox" onChange={(e)=>handleRedirect(e.target.checked,item)} className="h-4 w-4 border-gray-300 rounded-md p-2"/>
                    <p className="flex-1 text-center font-semibold text-gray-700 border  shadow-lg bg-gray-200 rounded-md p-2">{item.hours}</p>
                    <p className="flex-1 text-center font-semibold text-gray-700 border  shadow-lg bg-gray-200 rounded-md p-2">{item.description}</p>
                    <p className="flex-1 text-center font-semibold text-gray-700 border  shadow-lg bg-gray-200 rounded-md p-2">{item.workdate}</p>
                    <p className="flex-1 text-center font-semibold text-gray-700 border  shadow-lg bg-gray-200 rounded-md p-2">{item.projectId.name}</p>
                </div>
            ))}
        </div>
    )
}