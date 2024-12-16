"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { ThemeProject } from "./ContextProject";
import { ThemeContext } from "./Context";

export default function ProjectRouter() {
  const router = useRouter();
  const [projects] = useContext(ThemeProject);
  const [clients] = useContext(ThemeContext);

  useEffect(() => {
    if (projects == null || clients == null) {
      return // No hacer nada si aún no hay datos
    }

    if (clients.length === 0) {
      alert("Debes crear un cliente")
      router.push("/clientCreate") // No hacer nada si no hay clientes
    }

    if (projects.length === 0) {
      
        router.push("/projectCreate");
      
    } else {
      
        router.push("/projectList");
      
    }
  }, [projects, clients, router]); 

  return null
}
