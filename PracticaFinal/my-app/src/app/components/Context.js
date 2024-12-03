"use client"

import { createContext, useState } from 'react';
import { useEffect } from 'react';
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [clients, setClients] = useState(null);
  useEffect(()=>{
    const token=localStorage.getItem('jwt')
    fetch(`https://bildy-rpmaya.koyeb.app/api/client`,{
        headers:{ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
    })
    .then(result=>result.json())
    .then(json=>{setClients(json)})
  },[])
  return (
    <ThemeContext.Provider value={[ clients, setClients ]}>
      {children}
    </ThemeContext.Provider>
  );
};
