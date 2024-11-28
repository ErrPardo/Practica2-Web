"use client"

import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup';

export default function LoginReactHook(){
    const SignSquema=Yup.object({
        email:Yup.string().email("No es un email valido").required(),
        password:Yup.string().min(4,'Minimo 4 caracteres').max(10,'Maximo 10 caracteres').required()
    })
    
    const {register,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(SignSquema)});
    
    function onSubmit(data){
        console.log(data);
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('email')} placeholder="Introduce email"></input>
            {errors.email && <p className="block text-stone-50 bg-gradient-to-r from-cyan-500 to-blue-500">{errors.email.message}</p>}
            <input {...register('password')} placeholder="Introduce el password"></input>
            {errors.password && <p>{errors.password.message}</p>}
            <button>Aceptar</button>
        </form>
    )
}