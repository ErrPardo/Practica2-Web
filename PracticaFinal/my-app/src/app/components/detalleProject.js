'use client'

import NavBarProyectos from "./navBarProyectos";
import AsideProject from "./AsideProject";
import { useEffect,useState } from "react";
import Link from "next/link";
import { useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import { useRouter } from "next/navigation";

export default function DetalleProject(){
    const [client,setClient]=useState([])
    const [project,setProject]=useState([])
    const [content,setContent]=useState([])
    useEffect(()=>{
        const project=JSON.parse(localStorage.getItem('projectOne'))
        const token=localStorage.getItem('jwt')
        fetch(`https://bildy-rpmaya.koyeb.app/api/client/${project.clientId}`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            }
        })
        .then(result=>result.json())
        .then(json=>{setClient(json),setProject(project)})
            
    },[])
    const handleClick=(cambios)=>{


        if(cambios==='EditarProyecto'){
            setContent(<EditarProject project={project} handleClick={handleClick}/>)
        }
        else if(cambios==='RellenarAlbaran'){
            
            setContent(<FormAlbaran  project={project} handleClick={handleClick}/>)
        }
        else{
            setContent(<Datos project={project}/>)
        }
    }
    
    useEffect(()=>{
        setContent(<Datos project={project} handleClick={handleClick}/>)
    },[project])
    

    return(
        <>
            
            <NavBarProyectos/>
            <div className="flex h-5/6">
                <div className=" border bg-white border-gray-300 rounded-xl shadow-xl w-3/4 h-full flex justify-center items-center flex-col ml-2 p-6 gap-3">
                    <div className="border bg-white border-gray-300 rounded-xl shadow-lg flex-1 w-full p-6 "> 
                        <p className="text-5xl font-bold text-gray-800">{project.name}</p>
                        <p className="text-xl text-gray-500 mt-2" >Datos de este proyecto</p>
                        <div className="flex w-full mt-6 p-5 justify-center items-center">
                            <div className="w-[40%] h-[25%]  flex items-center flex-col">
                                <p className="text-3xl font-semibold text-gray-700">Ubicacion</p>
                                <p>{project?.address
                            ? `${project.address.street}, ${project.address.number}, ${project.address.postal}, ${project.address.province}`
                            : "No address available"}</p>
                            </div>
                            <div className="w-[40%] h-[25%]  flex items-center flex-col">
                                <p className="text-3xl font-semibold text-gray-700">CodigoInterno</p>
                                <p>{project.code}</p>
                            </div>
                            <div className="w-[40%] h-[25%]  flex items-center flex-col">
                                <p className="text-3xl font-semibold text-gray-700">Creado</p>
                                <p>{new Date(project.createdAt).toLocaleDateString()}</p>

                            </div>
                            
                        </div>
                        <div className="items-end flex justify-end gap-2 ">
                                <button className="flex border  justify-center flex-col text-xl gap-2 w-[20%] p-4 mt-5 border-gray-300 bg-gray-100 text-gray-600 rounded-lg shadow-md  hover:bg-gray-300 transition duration-200" onClick={()=>handleClick("EditarProyecto")}>Editar</button>
                                <button className="flex border  justify-center flex-col text-xl gap-2 w-[23%] p-4 mt-5 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-200" onClick={()=>handleClick("RellenarAlbaran")}>Crear Albaran</button>
                        </div>
                    </div>   
                    {content}    
                </div>
                
                <AsideProject client={client}/>
            </div>
        </>
    )
}


const Datos=({project})=>{
    return(
        <div className="border bg-white border-gray-300 rounded-xl shadow-lg flex-1 w-full p-6 overflow-y-auto">
        <div className="flex items-end gap-2">
            <p className="text-5xl font-bold text-gray-800">Albaranes</p>
            <Link className="text-xl w-full font-semibold text-blue-500 text-end text-decoration-line: underline hover:text-blue-700 transform transition-transform duration-200 ease-in-out" href="../albaranes">Ver todos</Link>
        </div>
        {project?._id && <Albaran project={project._id} />}
    
        </div>    
    )
}

const EditarProject=({project,handleClick})=>{
    const router=useRouter()
    const SignSquema=Yup.object({
        name: Yup.string().min(4, 'Mínimo 4 caracteres').required(),
        street: Yup.string().required('La calle es obligatoria'),
        number: Yup.string().required('El número es obligatorio'),
        postal: Yup.string().matches(/^\d{4,5}$/, 'Código postal inválido').required(),
        province: Yup.string().required('La provincia es obligatoria'),
        projectCode: Yup.string().min(9, '9 caracteres requerido').required(),
        code: Yup.string().min(9, '9 caracteres requerido').required(),
        email: Yup.string().email('Correo electrónico no válido').required()
    })
    const {register,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(SignSquema),
        defaultValues: {
            name: project?.name || '',
            street: project?.address?.street || '',
            number: project?.address?.number || '',
            postal: project?.address?.postal || '',
            province: project?.address?.province || '',
            projectCode: project?.projectCode || '',
            code: project?.code || '',
            email: project?.email || ''
        }
    });

    function onSubmit(data){
        
        const token=localStorage.getItem('jwt')
        const address = { street: data.street,number: data.number,postal: data.postal, province: data.province}
        data={...data,address,clientId:project.clientId}
        fetch(`https://bildy-rpmaya.koyeb.app/api/project/${project._id}`,{
            method:"PUT",
            headers:{ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body:JSON.stringify(data)  
        })
        
        router.push("../projectList")
    }
    return(
        <div className="border bg-white border-gray-300 rounded-xl shadow-xl flex-1 flex justify-center items-center flex-col ml-2 overflow-y-auto p-6">
            <form
                className="h-2/4 w-[90%] flex flex-wrap justify-center"
                onSubmit={handleSubmit(onSubmit)}
            >
                <p className="w-full text-lg font-medium text-gray-700">
                    Nombre del proyecto
                </p>
                <input
                    className="border w-full h-16 rounded-md shadow-md p-4 bg-white"
                    {...register('name')}
                    placeholder="Introduce el nombre"
                />
                {errors.name && <p>{errors.name.message}</p>}

                <p className="w-full text-lg font-medium text-gray-700">Calle</p>
                <input
                    className="border w-full h-16 rounded-md shadow-md p-4 bg-white"
                    {...register('street')}
                    placeholder="Introduce la calle"
                />
                {errors.street && <p>{errors.street.message}</p>}

                <p className="w-full text-lg font-medium text-gray-700">Número</p>
                <input
                    className="border w-full h-16 rounded-md shadow-md p-4 bg-white"
                    {...register('number')}
                    placeholder="Introduce el número"
                />
                {errors.number && <p>{errors.number.message}</p>}

                <p className="w-full text-lg font-medium text-gray-700">Código Postal</p>
                <input
                    className="border w-full h-16 rounded-md shadow-md p-4 bg-white"
                    {...register('postal')}
                    placeholder="Introduce el código postal"
                />
                {errors.postal && <p>{errors.postal.message}</p>}

                <p className="w-full text-lg font-medium text-gray-700">Provincia</p>
                <input
                    className="border w-full h-16 rounded-md shadow-md p-4 bg-white"
                    {...register('province')}
                    placeholder="Introduce la provincia"
                />
                {errors.province && <p>{errors.province.message}</p>}

                <p className="w-full text-lg font-medium text-gray-700">Código del proyecto</p>
                <input
                    className="border w-full h-16 rounded-md shadow-md p-4 bg-white"
                    {...register('projectCode')}
                    placeholder="Introduce el código del proyecto"
                />
                {errors.projectCode && <p>{errors.projectCode.message}</p>}

                <p className="w-full text-lg font-medium text-gray-700">Código</p>
                <input
                    className="border w-full h-16 rounded-md shadow-md p-4 bg-white"
                    {...register('code')}
                    placeholder="Introduce el código"
                />
                {errors.code && <p>{errors.code.message}</p>}

                <p className="w-full text-lg font-medium text-gray-700">Correo Electrónico</p>
                <input
                    className="border w-full h-16 rounded-md shadow-md p-4 bg-white"
                    {...register('email')}
                    placeholder="Introduce el correo electrónico"
                />
                {errors.email && <p>{errors.email.message}</p>}

                <div className="flex justify-end w-full mt-5 gap-5">
                    <button
                        type="button"
                        className="border w-1/4 h-16 font-medium border-gray-300 bg-gray-100 text-gray-600 p-2 rounded-lg shadow-md hover:bg-gray-300 transition duration-200"
                        onClick={() => handleClick('Cancelar')}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="border w-1/4 h-16 font-medium bg-blue-600 text-white p-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    )
}



const Albaran=({project})=>{
    const [detalleAlbaran,setDetalleAlbaran]=useState([])
    useEffect(() => {
        const token=localStorage.getItem('jwt')
           fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote/project/${project}`, {
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                },
            })
            .then((result) => result.json())
            .then((json) => {
                setDetalleAlbaran(json)
            })
    }, [project])
    return(
        <>
            <div className="border-gray-300 border h-[85%]  p-6 flex flex-col  items-center bg-white rounded-xl shadow-lg overflow-y-auto">
                        <div className="gap-28 flex w-[90%]">
                            <p className="w-[20%] text-sm font-semibold text-gray-700 p-2">Numero</p>
                            <p className="w-[20%] text-sm font-semibold text-gray-700 p-2" >Description</p>
                            <p className="w-[20%] text-sm font-semibold text-gray-700 p-2" >WorkDate</p>
                            <p className="w-[20%] text-sm font-semibold text-gray-700 p-2" >Fecha</p>
                            <p className="w-[20%] text-sm font-semibold text-gray-700 p-2" >Estado</p>
                        </div>
                            {detalleAlbaran && detalleAlbaran.map((item,index)=>(                              
                                <div className="p-6 gap-28 flex rounded-xl shadow-lg w-[90%] h-[55%] " key={index}>
                                    <p className="w-[20%] text-xl font-semibold text-gray-700 p-2">{'0'+(index+1)}</p>
                                    <p className="w-[20%] text-sm font-semibold text-gray-700 p-2">{item.description}</p>
                                    <p className="w-[20%] text-sm font-semibold text-gray-700 p-2">{item.workdate}</p>
                                    <p className="w-[20%] text-sm font-semibold text-gray-700 p-2">{new Date(item.createdAt).toLocaleDateString()}</p>
                                    <p className="w-[20%] text-sm font-semibold text-gray-700 p-2">{item.pending.toString()}</p>
                                </div>
                            ))
                            }
            </div>
            
                
        </>
    )
}

const FormAlbaran=({project,handleClick})=>{

    const SignSquema=Yup.object({
            hours:Yup.number()
            .typeError('Las horas deben ser un número') // Si el valor no es un número
            .positive('Las horas deben ser un número positivo') // Solo números positivos
            .integer('Las horas deben ser un número entero') // Solo números enteros
            .min(1, 'Debe ser al menos 1 hora') // Mínimo valor permitido
            .max(24, 'No puedes exceder las 24 horas') // Máximo valor permitido
            .required('El campo de horas es obligatorio'),
            description:Yup.string().required(),
            workdate:Yup.string()
            .matches(
              /^\d{4}-\d{2}-\d{2}$/,
              'La fecha debe tener el formato YYYY-MM-DD'
            )
            .required('La fecha es obligatoria')
        })
        const {register,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(SignSquema)});

        function onSubmit(data){
            const token=localStorage.getItem('jwt')
            data={...data,"clientId":project.clientId,"projectId":project._id,format:"hours"}
            console.log(data)
            fetch(`https://bildy-rpmaya.koyeb.app/api/deliverynote`,{
                method:"POST",
                headers:{ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body:JSON.stringify(data)  
            })
            .then(result=>(result.json()))
            .then(json=>{console.log(json)})
        }

    return(
        <>
        <div className="border bg-white border-gray-300 rounded-xl shadow-lg flex-1 w-full p-6 overflow-y-auto">
            <p className="text-5xl font-bold text-gray-800">Borrador Albaranes</p>
            <form className=" h-2/4 w-[90%] flex flex-wrap justify-center" onSubmit={handleSubmit(onSubmit)}>
                <p className="w-full text-lg font-medium text-gray-700">Horas trabajadas</p>
                <input className="border w-full h-16 rounded-md shadow-md p-4 bg-white" {...register('hours')} placeholder="Introduce numero de horas"></input>
                {errors.hours && <p>{errors.hours.message}</p>}
                <p className="w-full text-lg font-medium text-gray-700">Descripcion</p>
                <input className='border w-full h-16 rounded-md shadow-md p-4 bg-white' {...register('description')}placeholder="Introduce la descripcion"></input>
                {errors.description && <p>{errors.description.message}</p>}
                <p className="w-full text-lg font-medium text-gray-700">Fecha</p>
                <input className='border w-full h-16 rounded-md shadow-md p-4 bg-white'{...register('workdate')} placeholder="Introduce el dia de trabajo"></input>
                {errors.workdate && <p>{errors.workdate.message}</p>}
                <div className="flex justify-end w-full mt-5 gap-5 ">
                    <button className='border w-1/4 h-16 font-medium border-gray-300 bg-gray-100 text-gray-600 p-2 rounded-lg shadow-md  hover:bg-gray-300 transition duration-200' onClick={()=>handleClick('CrearClient')}>Descartar</button>
                    <button className='border w-1/4 h-16 font-medium bg-blue-600 text-white p-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200'>Guardar</button>
                </div>
            </form>
        </div>
        </>
    )
}