
import ProjectRouter from "../components/projectRouter";
import { ProviderProject } from "../components/ContextProject";
import { ThemeProvider } from "../components/Context";

export default function ProjectPage(){
    return(
        <>
            <ProviderProject>
                <ThemeProvider>
                    <ProjectRouter/>
                </ThemeProvider>
            </ProviderProject>
        </>
    )
}