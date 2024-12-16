"use client"

import NavBarProyectos from "./navBarProyectos";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import PopUpProject from "./PopUpProject";
import AsideProject from "./AsideProject";

export default function CrearProyecto(){
    const [client,setClient]=useState([])
    useEffect(()=>{
        const client=JSON.parse(localStorage.getItem('client'))
        if(client){
            setClient(client)
        }
        else{
            throw console.error("No hay un cliente seleccionado");
            
        }
        
    },[])
    return(
        <>
            <NavBarProyectos/>
            <div className="flex h-5/6">
                <FormProyecto clientId={client._id}/>
                <AsideProject client={client}></AsideProject>
            </div>
        </>

    )
}



const FormProyecto=({clientId})=>{
    const [showPopup, setShowPopup] = useState(false);
    const router=useRouter()
    
    const SignSquema=Yup.object({
        name:Yup.string().min(4,'Minimo 4 caracteres').required(),
        address:Yup.string().matches(/^[A-Za-z]+,\d{1,5},\d{4,5},[A-Za-z]+$/,
      'El formato de la dirección es inválido. Debe ser: Calle, Número, CódigoPostal, Ciudad'),
        projectCode:Yup.string().min(9,'9 caracteres requerido').required(),
        code:Yup.string().min(9,'9 caracteres requerido').required(),
        email:Yup.string().email('Invalid email address').required()
    })
    const {register,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(SignSquema)});

    function onSubmit(data){
        const token=localStorage.getItem('jwt')
        console.log(data)
        const array=data.address.split(',')
        const address={"street":array[0],"number":array[1],"postal":array[2],"province":array[3]}
        data={...data,address,clientId}
        console.log(data)
        fetch(`https://bildy-rpmaya.koyeb.app/api/project`,{
            method:"POST",
            headers:{ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body:JSON.stringify(data)  
        })
        .then(result=>(result.json()))
        .then(json=>(console.log(json),setShowPopup(true)))
    }
    return(
        <div className=" border bg-white border-gray-300 rounded-xl shadow-xl w-3/4 h-full flex justify-center items-center flex-col ml-2">
        <h1 className='text-6xl font-bold text-center text-gray-800'>NuevoProyecto</h1>
        <form className=" h-2/4 w-[90%] flex flex-wrap justify-center gap-1" onSubmit={handleSubmit(onSubmit)}>
            <p className="w-full text-lg font-medium text-gray-700">Nombre del proyecto</p>
            <input className="bg-white border border-gray-300 rounded-xl shadow-xl flex-1 p-5" {...register('name')} placeholder="Nombre proyecto"></input>
            {errors.name && <p>{errors.name.message}</p>}

            <p className="w-full text-lg font-medium text-gray-700">Datos de tu cliente</p>
            <input className='bg-white border w-full border-gray-300 rounded-xl shadow-xl  p-5' {...register('projectCode')}placeholder="Codigo"></input>
            {errors.projectCode && <p>{errors.projectCode.message}</p>}
            <input className='bg-white border w-full border-gray-300 rounded-xl shadow-xl  p-5' {...register('address')}placeholder="Direccion proyecto"></input>
            {errors.address && <p>{errors.address.message}</p>}
            <input className='bg-white border w-full border-gray-300 rounded-xl shadow-xl  p-5' {...register('email')}placeholder="Email"></input>
            {errors.email && <p>{errors.email.message}</p>}

            <p className="w-full text-lg font-medium text-gray-700">Datos de tu empresa</p>
            <input className='bg-white border border-gray-300 rounded-xl shadow-xl flex-1 p-5'{...register('code')} placeholder="Codigo interno del proyecto"></input>
            {errors.code && <p>{errors.code.message}</p>}

            <div className="flex justify-end w-screen mt-5 gap-5">
            <button className='border w-1/4 h-16 font-medium bg-blue-600 text-white p-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200'>Guardar</button>
            </div>
        </form>
        <PopUpProject showPopup={showPopup} setShowPopup={setShowPopup}/>
        </div>
    )
}