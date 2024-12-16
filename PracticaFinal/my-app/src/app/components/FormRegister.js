import { useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';


export default function FormRegister({onSubmit}){
    const router=useRouter()
    const SignSquema=Yup.object({
        email:Yup.string().email("No es un email valido").required(),
        password:Yup.string().min(4,'Minimo 4 caracteres').max(15,'Maximo 15 caracteres').required()
    })
    
    const {register,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(SignSquema)});
    

    return(
        <form className="w-3/4 sm:w-2/4 flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full mb-6">
                <p className="text-3xl font-semibold text-gray-700 mb-2">Correo</p>
                <input
                    className="border-2 w-full h-16 p-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
                    {...register('email')}
                    placeholder="Introduce email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
            </div>
            
            
            <div className="w-full mb-6">
                <p className="text-3xl font-semibold text-gray-700 mb-2">Contraseña</p>
                <input
                    type="password"
                    className="border-2 w-full h-16 p-4 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
                    {...register('password')}
                    placeholder="Introduce el password"
                />
                {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
            </div>
            
            
            <div className="w-full flex justify-center">
                <button type="submit" className="w-6/12 h-16 bg-blue-600 text-white text-2xl font-semibold rounded-lg shadow-md hover:bg-blue-500 transition duration-200">
                    Aceptar
                </button>
            </div>
        </form>
    )
}