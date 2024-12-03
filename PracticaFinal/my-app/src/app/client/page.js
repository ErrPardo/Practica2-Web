import ClientRouter from "../components/ClientRouter";
import { ThemeProvider } from "../components/Context";
export default function ClientPage(){
    return(
        <>
            <ThemeProvider>
            <ClientRouter></ClientRouter>
            </ThemeProvider>
        </>
    )
    
}