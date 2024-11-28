"use client"

import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { useEffect } from 'react';

export default function LoginReactHook(){
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
    }

    return(
        <div className='w-screen h-screen'>
        <h1 className='flex justify-center relative -bottom-1/4'>Create your ID</h1>
        <form className="border-2 h-2/4 flex flex-wrap items-center justify-center relative -bottom-1/4 w-2/4 ml-64" onSubmit={handleSubmit(onSubmit)}>
            <p>Correo</p>
            <input className="border-2 w-screen h-16" {...register('email')} placeholder="Introduce email"></input>
            {errors.email && <p className="block text-stone-50 bg-gradient-to-r from-cyan-500 to-blue-500">{errors.email.message}</p>}
            <p>Contraseña</p>
            <input className='border-2 w-screen h-16' {...register('password')} placeholder="Introduce el password"></input>
            {errors.password && <p>{errors.password.message}</p>}
            <button className='border-2 w-6/12 h-16'>Aceptar</button>
        </form>
        </div>
    )
}