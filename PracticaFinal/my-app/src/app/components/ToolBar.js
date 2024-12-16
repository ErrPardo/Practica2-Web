"use client"


import { useRouter } from "next/navigation"

export default function ToolBar({albaran}){

    function handleDownload(deliverynoteId){
        const token=localStorage.getItem('jwt')
        const button=document.getElementById('Button')
        const buttonColor = window.getComputedStyle(button).backgroundColor;
        const targetColor = 'rgb(59, 130, 246)'
        if(buttonColor === targetColor){
            console.log('entra')
            fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote/pdf/${deliverynoteId}`,{
                headers:{ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            })
            .then(result=>result.blob())
            .then(blob=>{
                // Crear un objeto URL para el Blob
                const url = URL.createObjectURL(blob);
                
                // Crear un enlace temporal para descargar el archivo
                const a = document.createElement('a');
                a.href = url;
                a.download = 'albaran.pdf'; // Aquí puedes cambiar el nombre del archivo si lo deseas
                a.click(); // Simula un clic para descargar el archivo
                
                // Liberar el objeto URL
                URL.revokeObjectURL(url);
            })
        }
    }

    const router=useRouter()
    return (
        <div className="h-[7%] flex items-center gap-4 ">
            <input type="text" className="flex-1 border border-gray-300 shadow-lg h-full p-2 rounded-md bg-white" placeholder="Buscar proyectos..."/>
            <button className="flex-1 max-w-[15%] h-full bg-blue-500 text-white font-semibold shadow-lg rounded-md hover:bg-blue-600 transition-colors duration-300"onClick={()=>router.push('../projectCreate')}> Crear Proyecto</button>
            <button className="flex-1 max-w-[15%] h-full bg-gray-200 text-gray-700 font-semibold shadow-lg rounded-md hover:bg-gray-300 transition-colors duration-300">Filtros</button>
            <button className="flex-1 max-w-[15%] h-full bg-gray-200 text-gray-700 font-semibold shadow-lg rounded-md hover:bg-gray-300 transition-colors duration-300">Calendario</button>
            <button id="Button" className="flex-1 max-w-[15%] h-full bg-gray-200 text-gray-700 font-semibold shadow-lg rounded-md hover:bg-gray-300 transition-colors duration-300" onClick={()=>handleDownload(albaran._id)}>Descargar</button>
        </div>
    )
}