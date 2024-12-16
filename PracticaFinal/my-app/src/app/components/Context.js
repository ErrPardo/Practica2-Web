"use client"

import { createContext, useState } from 'react';
import { useEffect } from 'react';
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [clients, setClients] = useState(null);
  /*useEffect(()=>{
    const token=localStorage.getItem('jwt')
    fetch(`https://bildy-rpmaya.koyeb.app/api/client`,{
        headers:{ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
    })
    .then(result=>result.json())
    .then(json=>{
      setClients(json)
      console.log(json)
    })
  },[])*/
  useEffect(()=>{
    try {
      const token = localStorage.getItem('jwt');
      fetch(`https://bildy-rpmaya.koyeb.app/api/client`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
          }
          return response.json();
        })
        .then((json) => {
          setClients(json) // Actualiza el estado con los datos recibidos
        })
        .catch((error) => {
          console.error("Error al procesar los datos:", error); // Maneja errores del fetch o de JSON
        });
    } catch (error) {
      console.error("Error general en fetchClients:", error); // Captura errores de bloque externo
    }
  },[])
  
  return (
    <ThemeContext.Provider value={[ clients, setClients ]}>
      {children}
    </ThemeContext.Provider>
  );
};
