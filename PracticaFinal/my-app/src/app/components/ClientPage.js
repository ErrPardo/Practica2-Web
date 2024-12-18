"use client"
import { useState,useEffect } from "react"
import { useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import NavBarSecundario from "./navBarSecundario";
import PopUpCreate from "./PopUpCreate";



function ClientPage(){
    

    const handleClick=(cambios,Clogo)=>{
        if(cambios==='RellenarClient'){
            console.log(Clogo)
            setContent(<RellenarClientPage handleClick={handleClick} logo={Clogo}/>)
        }
        else{
            setContent(<CrearClientPage handleClick={handleClick}/>)
        }
    }
    const [content,setContent]=useState(<CrearClientPage handleClick={handleClick}/>)
    return(
        <>
        <NavBarSecundario></NavBarSecundario>
        <div className="flex h-5/6">
            {content}
            <AsideClientPage handleClick={handleClick}></AsideClientPage>
        </div>
        </>
    )
}

const RellenarClientPage=({handleClick,logo})=>{
    const [showPopup, setShowPopup] = useState(false);
    const token=localStorage.getItem('jwt')
    const SignSquema=Yup.object({
        name:Yup.string().min(4,'Minimo 4 caracteres').required(),
        address:Yup.string().matches(/^[A-Za-z]+,\d{1,5},\d{4,5},[A-Za-z]+$/,
      'El formato de la dirección es inválido. Debe ser: Calle, Número, CódigoPostal, Ciudad'),
        cif:Yup.string().min(9,'9 caracteres requerido').required()
    })
    const {register,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(SignSquema)});

    function onSubmit(data){
        
        const array=data.address.split(',')
        const address={"street":array[0],"number":array[1],"postal":array[2],"province":array[3]}
        data={...data,address}
        console.log(data)
        fetch(`https://bildy-rpmaya.koyeb.app/api/client`,{
            method:"POST",
            headers:{ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body:JSON.stringify(data)  
        })
        .then(result=>(result.json()))
        .then(json=>{
            console.log(logo)
            if(logo!=null){
                const formData = new FormData();
                formData.append("image",logo)
                fetch(`https://bildy-rpmaya.koyeb.app/api/client/logo/${json._id}`,{
                    method:"PATCH",
                    headers:{ 'Authorization': `Bearer ${token}`},
                    body:formData  
                })
                .then(result=>(result.json()))
                .then(json=>console.log(json))
            }
            setShowPopup(true)
        })
    }
    return(
        <>
        <div className=" border bg-white border-gray-300 rounded-xl shadow-xl w-3/4 h-full flex justify-center items-center flex-col ml-2">
        <h1 className='text-6xl font-bold text-center text-gray-800'>NuevoCliente</h1>
        <form className=" h-2/4 w-[90%] flex flex-wrap justify-center" onSubmit={handleSubmit(onSubmit)}>
            <p className="w-full text-lg font-medium text-gray-700">Nombre del cliente y la empresa</p>
            <input className="border w-full h-16 rounded-md shadow-md p-4 bg-white" {...register('name')} placeholder="Introduce nombre"></input>
            {errors.name && <p>{errors.name.message}</p>}
            <p className="w-full text-lg font-medium text-gray-700">Domicilio Fiscal</p>
            <input className='border w-full h-16 rounded-md shadow-md p-4 bg-white' {...register('address')}placeholder="Introduce el dominio"></input>
            {errors.address && <p>{errors.address.message}</p>}
            <p className="w-full text-lg font-medium text-gray-700">Si te sabes el CIF,añadelo</p>
            <input className='border w-full h-16 rounded-md shadow-md p-4 bg-white'{...register('cif')} placeholder="Introduce el Cif"></input>
            {errors.cif && <p>{errors.cif.message}</p>}
            <div className="flex justify-end w-full mt-5 gap-5">
            <button className='border w-1/4 h-16 font-medium border-gray-300 bg-gray-100 text-gray-600 p-2 rounded-lg shadow-md  hover:bg-gray-300 transition duration-200' onClick={()=>handleClick('CrearClient')}>Descartar</button>
            <button className='border w-1/4 h-16 font-medium bg-blue-600 text-white p-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200'>Guardar</button>
            </div>
        </form>
        <PopUpCreate showPopup={showPopup} setShowPopup={setShowPopup}/>
        </div>
        
        </>
    )
}
const CrearClientPage = ({ handleClick }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-5 bg-white border border-gray-300 rounded-xl shadow-xl ml-2">
            <p className="text-6xl font-bold text-center text-gray-800 mb-5">Crea tu nuevo cliente</p>
            <p className="text-2xl text-center text-gray-600 mb-10">Para poder generar albaranes digitales</p>
            <button onClick={() => handleClick('RellenarClient')} className="w-1/3 p-3 text-2xl font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300">Crear Nuevo Cliente</button>
        </div>
    )
}


const AsideClientPage=({handleClick})=>{
    
    function handleImage(event){
        const file = event.target.files[0]
        handleClick('RellenarClient', file);
    }
    return(
        <div className="flex flex-col w-1/4 h-full pl-5 space-y-2 mr-2">
            <div className="bg-white border border-gray-300 rounded-xl shadow-xl flex-1 p-5" >
                <p className="text-3xl font-bold text-gray-800">LogoCliente</p>
                <div className="w-full h-full">
                    <input
                        className="opacity-0 cursor-pointer"
                        onChange={handleImage}
                        type="file"
                        id="avatar"
                        name="avatar"
                        accept="image/png, image/jpeg"
                    />
                    <label
                        htmlFor="avatar"
                        className="flex items-center justify-center w-full h-[70%] border border-gray-300 bg-gray-100 shadow-lg  rounded-lg cursor-pointer hover:bg-gray-300 transition duration-200">
                    <p className="text-gray-600 text-xl">Haz clic para cargar el logo</p>        
                    </label>
                </div>
            </div>
            <div className="bg-white border border-gray-300 rounded-xl shadow-xl flex flex-col items-center p-6 space-y-4 flex-1">
                <p className="text-3xl font-bold text-gray-800">Notas</p>
                <textarea
                    className="w-full h-full border rounded-md p-3 text-gray-700"
                    placeholder="Introduce notas"
                />
            </div>
            <div className="bg-white border border-gray-300 rounded-xl shadow-xl flex flex-col items-center p-6 space-y-4 flex-1">
            <p className="text-3xl font-bold text-gray-800">Etiquetas</p>
            <textarea
                className="w-full h-full border rounded-md p-3 text-gray-700 "
                placeholder="Introduce notas"
            />
            </div>
        </div>
    )
}
export default ClientPage;