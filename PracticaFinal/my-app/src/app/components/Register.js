"use client"

import { useRouter } from 'next/navigation';
import FormRegister from './FormRegister';


export default function Register(){
    const router=useRouter()
    function onSubmit(data){
        //console.log(data)
        fetch(`https://bildy-rpmaya.koyeb.app/api/user/register`,{
            method:"POST",
            headers:{ 'Content-Type': 'application/json'},
            body:JSON.stringify(data)  
        })
        .then(result=>(result.json()))
        .then(json=>{
            localStorage.setItem('jwt', json.token)
        })
        router.push("/loader");
        setTimeout(() => {
            router.push("/verification")
        }, 3000);
    }
    return(
        <>
        <div className='flex flex-col items-center justify-center w-screen h-screen bg-gray-100'>
        
            <h1 className='text-6xl font-semibold text-gray-800 mb-10'>Create your ID</h1>
            
            <FormRegister onSubmit={onSubmit}/> 
               
        </div>
        </>
    )
}