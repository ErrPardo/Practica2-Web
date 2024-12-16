"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./Context";

export default function ClientRouter() {
  const router = useRouter();
  const [clients] = useContext(ThemeContext);

  useEffect(() => {
    if (clients == null) {
      return; 
    }

    if (clients.length === 0) {
      
        router.push("/clientCreate");
      
    } else {
      
        router.push("/clientList");
      
    }
  }, [clients, router]); 

  return null;
}
