"use client"
import { useState } from "react"
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'

function ClientPage(){

    const handleClick=(cambios)=>{
        if(cambios==='RellenarClient'){
            setContent(<RellenarClientPage handleClick={handleClick}/>)
        }
        else{
            setContent(<CrearClientPage handleClick={handleClick}/>)
        }
    }
    const [content,setContent]=useState(<CrearClientPage handleClick={handleClick}/>)
    
    
    
    return(
        <>
        <div className="flex h-5/6">
            {content}
            <AsideClientPage></AsideClientPage>
        </div>
        </>
    )
    
    
}

const RellenarClientPage=({handleClick})=>{
    const router=useRouter()
    const SignSquema=Yup.object({
        nombre:Yup.string().min(4,'Minimo 4 caracteres').required(),
        domicilio:Yup.string().max(20,'Maximo 20 caracteres').required(),
        cif:Yup.string().min(9,'9 caracteres requerido').required()
    })
    const {register,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(SignSquema)});
    function onSubmit(data){
        //console.log(data)
        /*fetch(`https://bildy-rpmaya.koyeb.app/api/user/login`,{
            method:"POST",
            headers:{ 'Content-Type': 'application/json'},
            body:JSON.stringify(data)  
        })
        .then(result=>(result.json()))
        .then(json=>(console.log(json),localStorage.setItem('jwt', json.token)))*/
        console.log(data)
    }
    return(
        <div className="border-black border-2 w-3/4 h-full mt-5 flex justify-center items-center flex-col">
        <h1 className='text-5xl'>NuevoCliente</h1>
        <form className=" h-2/4 w-[90%] flex flex-wrap justify-center ml-5" onSubmit={handleSubmit(onSubmit)}>
            <p className="flex w-screen items-start justify-start">Nombre del cliente y la empresa</p>
            <input className="border-2 w-screen h-16 shadow-2xl rounded" {...register('nombre')} placeholder="Introduce nombre"></input>
            {errors.nombre && <p>{errors.nombre.message}</p>}
            <p className="flex w-screen items-start justify-start">Domicilio Fiscal</p>
            <input className='border-2 w-screen h-16 shadow-2xl rounded' {...register('domicilio')}placeholder="Introduce el dominio"></input>
            {errors.domicilio && <p>{errors.domicilio.message}</p>}
            <p className="flex w-screen items-start justify-start">Si te sabes el CIF,añadelo</p>
            <input className='border-2 w-screen h-16 shadow-2xl rounded'{...register('cif')} placeholder="Introduce el Cif"></input>
            {errors.cif && <p>{errors.cif.message}</p>}
            <div className="flex justify-end w-screen mt-5 gap-5">
            <button className='border-2 w-1/4 h-16 shadow-2xl rounded hover:bg-slate-300' onClick={()=>handleClick('CrearClient')}>Descartar</button>
            <button className='border-2 w-1/4 h-16 shadow-2xl rounded hover:bg-slate-300'>Guardar</button>
            </div>
        </form>
        
        </div>
    )
}
const CrearClientPage=({handleClick})=>{
    return(
        <div className="border-black border-2 w-3/4 h-full mt-5 flex justify-center flex-col items-center">
            <p className="text-9xl">Crea tu nuevo cliente</p>
            <p className="text-5xl">Para poder generar Albaranes digitales</p>
            <button onClick={()=>handleClick('RellenarClient')} className="flex justify-center items-center text-2xl mt-10 border-2 w-1/5 h-[10vh] rounded hover:bg-slate-300 border-black" href="./RellenarClientePage">CrearNuevoCliente</button>
        </div>
    )
}

const AsideClientPage=()=>{
    return(
        <div className="flex flex-col w-1/4 h-full pl-5 space-y-2 mt-5">
            <div className="border-black border-2 flex-1" >LogoCliente</div>
            <div className="border-black border-2 flex-1">Notas</div>
            <div className="border-black border-2 flex-1">Etiquetas</div>
        </div>
    )
}
export default ClientPage;