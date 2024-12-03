"use client"

import { useRouter } from "next/navigation"
import { useContext } from "react";
import { ThemeContext } from "./Context";

export default function ClientRouter(){
    const [clients]= useContext(ThemeContext);
    const router=useRouter()
    if(clients==null){}  
    else if(clients.length==0){
        router.push('../clientCreate')
    }
    else{
        router.push('../clientList')
    }
    return(
        <></>
    )
}