"use client"

import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import FormRegister from './FormRegister';
import Link from 'next/link';

export default function LoginReactHook(){
    const router=useRouter();
    function onSubmit(data) {
        fetch(`https://bildy-rpmaya.koyeb.app/api/user/login`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                // Si el servidor responde con un error (ej. 401, 400, etc.)
                return response.json().then(err => {
                    throw new Error(err.message || "Login failed. Please try again.");
                });
            }
            return response.json();
        })
        .then(json => {
            if (!json.token) {
                throw new Error("Invalid response: Token not received.");
            }
            // Guardar el token en localStorage
            localStorage.setItem('jwt', json.token);
            console.log("Login exitoso:", json);
    
            // Redirigir al usuario
            router.push("/loader");
            setTimeout(() => {
                router.push("/client");
            }, 3000)
        })
        .catch(error => {
            // Manejar errores
            console.error("Error en el login:", error.message);
            alert(`Login error: ${error.message}`); // Mostrar error al usuario
        })
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
        
    <div className='flex flex-col items-center justify-center w-screen h-screen bg-gray-100'>
        <h1 className='text-6xl font-semibold text-gray-800 mb-10'>Create your ID</h1>
        <FormRegister onSubmit={onSubmit}/>
        <Link className="text-xl w-1/2 font-semibold text-blue-500 text-end text-decoration-line: underline hover:text-blue-700 transform transition-transform duration-200 ease-in-out" href="../register">Registrate</Link>
    </div>

    )
}