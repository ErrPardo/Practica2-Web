import ClientPage from "../components/ClientPage";
import NavBar from "../components/navBar";
import NavBarSecundario from "../components/navBarSecundario";

export default function Home() {
  return (
    <>
    <NavBar></NavBar>
    <NavBarSecundario></NavBarSecundario>
    <ClientPage></ClientPage>
    </>
  );
}
