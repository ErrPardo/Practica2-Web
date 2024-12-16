import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'


export default function Validation(){
    const router = useRouter();

  // Definir el esquema de validación con Yup
    const SignSchema = Yup.object({
        code: Yup.number()
            .typeError("El código debe ser un número") // En caso de que el valor no sea un número
            .integer("El código debe ser un número entero") // Asegura que el valor sea un número entero
            .positive("El código no puede ser negativo") // Asegura que sea un número positivo
            .min(100000, "El código debe tener 6 dígitos") // Asegura que sea al menos 6 dígitos
            .max(999999, "El código debe tener 6 dígitos") // Asegura que no sea mayor de 6 dígitos
            .required("El código es obligatorio")
        })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(SignSchema),
    })
    
    function onSubmit(data){
        const token=localStorage.getItem('jwt')
        fetch(`https://bildy-rpmaya.koyeb.app/api/user/validation`,{
            method:"PUT",
            headers:{ 'Content-Type': 'application/json','Authorization': `Bearer ${token}`},
            body:JSON.stringify(data)  
        })
        .then(result=>(result.json()))
        .then(json=>(console.log(json)))
        router.push("/loader");
        setTimeout(() => {
            router.push("/client")
        }, 3000);
    }

    return(
        <div className='flex flex-col items-center justify-center w-screen h-screen bg-gray-100'>
                
            <h1 className='text-6xl font-semibold text-gray-800 mb-10'>Validate</h1>
                    
            <form className="w-3/4 sm:w-2/4 flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mb-6">
                <p className="text-3xl font-semibold text-gray-700 mb-2">Introduce codigo de verificacion</p>
                <p className="text-sm font-semibold text-gray-700 mb-2">Se ha enviado un codigo al correo</p>
                <input
                    className="border-2 w-full h-16 p-4 rounded-lg shadow-md"
                    {...register('code')}
                    placeholder="Introduce codigo"
                />
                {errors.code && <p className="text-red-500 text-sm mt-2">{errors.code.message}</p>}
            </div>
            
            <div className="w-full flex justify-center">
                <button type="submit" className="w-6/12 h-16 bg-blue-600 text-white text-2xl font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-200">
                    Verificar
                </button>
            </div>
        </form> 
                       
        </div>
    )
}