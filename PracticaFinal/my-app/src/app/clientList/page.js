    
import ClientList from "../components/ListaClient"
import { ThemeProvider } from "../components/Context";
import NavBar from "../components/navBar";
export default function ClientListPage(){
    return(
        <>
            <NavBar/>
            <ThemeProvider>
            <ClientList></ClientList>
            </ThemeProvider>
        </>

    )
}