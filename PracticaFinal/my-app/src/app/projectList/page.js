import ProyectosPage from "../components/ProyectosList";
import { ProviderProject } from "../components/ContextProject";
import NavBar from "../components/navBar";

export default function ProjectListPage(){
    return(
        <>
            <ProviderProject>
            <NavBar/>    
            <ProyectosPage/>
            </ProviderProject>
        </>
    )
}