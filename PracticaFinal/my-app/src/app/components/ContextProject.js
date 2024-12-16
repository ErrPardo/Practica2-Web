"use client"

import { createContext, useState } from 'react';
import { useEffect } from 'react';
export const ThemeProject = createContext();  

export const ProviderProject=({children})=>{
    const [projects, setProjects] = useState(null);
    useEffect(()=>{
        const token=localStorage.getItem('jwt')
        fetch(`https://bildy-rpmaya.koyeb.app/api/project`,{
            headers:{ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        })
        .then(result=>result.json())
        .then(json=>{setProjects(json)})
      },[])

    return(
        <>
        <ThemeProject.Provider value={[ projects, setProjects ]}>
        {children}
        </ThemeProject.Provider>
        </>
    )
}