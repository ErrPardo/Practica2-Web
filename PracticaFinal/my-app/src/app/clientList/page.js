
import ClientList from "../components/ListaClient"
import { ThemeProvider } from "../components/Context";
export default function ClientListPage(){
    return(
        <>
            <ThemeProvider>
            <ClientList></ClientList>
            </ThemeProvider>
        </>

    )
}