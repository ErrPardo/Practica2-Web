"use client"

import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import { useState } from 'react';

export default function LoginReactHook(){
    const router=useRouter();

    const SignSquema=Yup.object({
        email:Yup.string().email("No es un email valido").required(),
        password:Yup.string().min(4,'Minimo 4 caracteres').max(15,'Maximo 15 caracteres').required()
    })
    
    const {register,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(SignSquema)});
    
    function onSubmit(data){
        //console.log(data)
        fetch(`https://bildy-rpmaya.koyeb.app/api/user/login`,{
            method:"POST",
            headers:{ 'Content-Type': 'application/json'},
            body:JSON.stringify(data)  
        })
        .then(result=>(result.json()))
        .then(json=>(console.log(json),localStorage.setItem('jwt', json.token)))
        router.push('./client')
    }
    
    useEffect(()=>{
        
        const token=localStorage.getItem('jwt')
        if(token){
            router.push("/loader");
            setTimeout(() => {
                router.push("/client")
            }, 3000);
            
        } 
    },[])

    return(
        
        <div className=' flex flex-col items-center w-screen h-screen'>
        <h1 className='flex justify-center relative -bottom-1/4 text-6xl'>Create your ID</h1>
        <form className="h-2/4 flex flex-wrap items-center justify-center relative -bottom-1/4 w-2/4 " onSubmit={handleSubmit(onSubmit)}>
            <p className='w-screen text-3xl'>Correo</p>
            <input className="border-2 w-screen h-16 shadow-2xl rounded" {...register('email')} placeholder="Introduce email"></input>
            {errors.email && <p>{errors.email.message}</p>}
            <p className='w-screen text-3xl'>Contraseña</p>
            <input className='border-2 w-screen h-16 shadow-2xl rounded' {...register('password')} placeholder="Introduce el password"></input>
            {errors.password && <p>{errors.password.message}</p>}
            <div className='w-screen flex justify-center'>
            <button className='border-2 w-6/12 h-16 shadow-2xl rounded hover:bg-slate-300'>Aceptar</button>
            </div>
            
        </form>
        </div>
    )
}